import ast
import asyncio
import logging
import uuid
from functools import lru_cache
from typing import List

from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from api.const import MENU_QUERY_ITEMS
from api.endpoints import TheMealDB, TheCocktailDB
from api.endpoints.AI.AI_base import AIBase
from api.endpoints.DB.crud import get_saved_menus_db, save_menu_db
from api.endpoints.DB.models import SavedMenu, UserSavedMenus, User
from api.util.conversions import convert_to_recipe, convert_to_ingredient, convert_to_search_results, \
    combine_search_results, get_valid_literals
from api.util.fastapi_types import Menu
from api.util.filtering import ContentFilter

_API_IDS = {
        "M": TheMealDB,
        "C": TheCocktailDB,
        # "N": NinjasCocktailAPI,
        # "R": NinjasRecipeAPI
    }

def handle_api_call(call_id: str, search_method: str = 'search_by_id'):
    """
    Generic handler for API calls based on database identifier.

    Args:
        call_id (str): API identifier in format '<DB>+<ID>'
        search_method (str, optional): Method to call on database class. Defaults to 'search_by_id'.
    """
    try:
        db_type, item_id = call_id.split('+')
        db_class = _API_IDS[db_type]
        if search_method == "search_by_name":
            db_class = ContentFilter(db_class)
        else:
            db_class = db_class()
        return getattr(db_class, search_method)(item_id)
    except (ValueError, KeyError) as e:
        raise ValueError(f"Invalid API call format: {call_id}") from e


def handle_id_calls(call_id: str):
    recipe = handle_api_call(call_id, search_method='search_by_id')
    recipe = convert_to_recipe(recipe)
    return recipe

def handle_ingredient_calls(call_id: str):
    for db_type in _API_IDS:
        try:
            db_class = _API_IDS[db_type]
            ingredient = getattr(db_class(), 'get_ingredient_by_id')(call_id)
            return convert_to_ingredient(ingredient)
        except Exception as e:
            logging.error(f"Error getting ingredient: {e}")
            return None
    return None


def handle_name_search_calls(query: str):
    response = []
    for db_type in _API_IDS:
        call_id = f"{db_type}+{query}"
        call_return = handle_api_call(call_id, search_method='search_by_name')
        if call_return:
            conversion = convert_to_search_results(call_return)
            response.append(conversion)

        # # Try to get an ingredient as well TODO: Not now, Soon :)
        # ingredient_call_return = handle_api_call(call_id, search_method='get_ingredient_by_id')
        # if ingredient_call_return:
        #     response.append(ingredient_call_return)
    return combine_search_results(*response)


async def handle_menu_calls(mealdb=None, cocktaildb=None, ai=None) -> Menu:
    """
    Handles menu calls and returns a structured Menu response.

    Args:
        mealdb: Meal database instance, defaults to TheMealDB()
        cocktaildb: Cocktail database instance, defaults to TheCocktailDB()
        ai: AI instance, defaults to AIBase()

    Returns:
        Menu: Structured menu with food and drink items
    """
    mealdb = mealdb or TheMealDB()
    cocktaildb = cocktaildb or TheCocktailDB()
    ai = ai or AIBase()

    meals_task = asyncio.create_task(get_meals(mealdb, MENU_QUERY_ITEMS))
    cocktails_task = asyncio.create_task(get_cocktails(cocktaildb, MENU_QUERY_ITEMS))

    # Wait for both tasks to complete
    meals, cocktails = await asyncio.gather(meals_task, cocktails_task)

    built_menu = ai.build_menu(
        meals=meals,
        cocktails=cocktails,
        preferences=None  # TODO: update this with user preferences if the user is logged in.
    )

    try:
        menu_dict = ast.literal_eval(built_menu)  # TODO: This is unsafe!!!! :O but JSON freaks the hell out
    except (SyntaxError, ValueError) as e:
        logging.error(f"Error parsing response: {e}")
        menu_dict = {"food": [], "drinks": []}

    try:
        return Menu(food=menu_dict["food"], drinks=menu_dict["drinks"])
    except Exception as e:
        logging.error(f"Error creating Menu model: {e}")
        # Return an empty menu rather than failing
        return Menu(food=[], drinks=[])


@lru_cache(maxsize=32)
async def get_meals(mealdb, count):
    return await asyncio.to_thread(mealdb.get_n_random, count)


@lru_cache(maxsize=32)
async def get_cocktails(cocktaildb, count):
    return await asyncio.to_thread(cocktaildb.get_n_random, count)


def handle_save_menu(save_request_menu: Menu, user_id: int, db):
    try:
        new_menu_id = save_menu_db(db, save_request_menu, user_id)
        logging.info(f"Menu saved successfully: {new_menu_id}")
        return new_menu_id

    except SQLAlchemyError as e:
        db.rollback()
        logging.error(f"Error saving menu: {e}")
        return None
    finally:
        db.close()

def handle_get_menus(user_id, db):
    menus = get_saved_menus_db(db, user_id)

    pydantic_menus: List[Menu] = []
    for menu in menus:
        try:
            pydantic_menu = Menu.model_validate_json(menu.saved_menu)
            if menu.timestamp:
                pydantic_menu.timestamp = menu.timestamp.isoformat()
            pydantic_menus.append(pydantic_menu)
        except ValidationError as e:
            print(f"Validation Error converting Saved_menu: {e}")
        except Exception as e:
            print(f"Unexpected Error converting Saved_menu: {e}")
    return pydantic_menus
