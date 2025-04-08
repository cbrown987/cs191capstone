from api.endpoints import TheMealDB, TheCocktailDB
from api.util.conversions import convert_to_recipe, convert_to_ingredient, convert_to_search_results, \
    combine_search_results

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
        return getattr(db_class(), search_method)(item_id)
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
        except:
            pass

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
