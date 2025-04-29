import logging
from typing import List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from api.endpoints import TheMealDB, TheCocktailDB
from api.endpoints.AI.AI_base import AIBase
from api.endpoints.DB import database, crud
from api.endpoints.photos.pixabay import Pixabay
from api.util.conversions import Recipe, convert_to_recipe, \
    convert_to_search_results, combine_search_results, Ingredient, SearchResult
from api.util.fastapi_types import Menu, ImageURL, AIResponseText, LoginRequest, User, UserCreate, SaveRecipeRequest, \
    SaveMenuRequest
from api.util.filtering import ContentFilter
from api.util.handlers import handle_id_calls, handle_ingredient_calls, handle_name_search_calls, handle_menu_calls, \
    handle_save_menu, handle_get_menus

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # These are unsafe but what the hell
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


async def get_themealdb() -> TheMealDB:
    return TheMealDB()


async def get_thecocktaildb() -> TheCocktailDB:
    return TheCocktailDB()


async def get_pixabay() -> Pixabay:
    return Pixabay()


async def get_aibase() -> AIBase:
    return AIBase()


# ************
# ** Routes **
# ************
@app.get("/api/food/recipes", response_model=List[Recipe])
@app.get("/food/recipes", response_model=List[Recipe])
async def food_recipes(limit: int = 10):
    """Get a list of random food recipes."""
    themealdb = await get_themealdb()
    meals = themealdb.get_n_random(limit)
    recipes = [convert_to_recipe(meal) for meal in meals]
    return recipes


@app.get("/menu/", response_model=Menu)
@app.get("/api/menu/", response_model=Menu)
async def get_menu():
    """Get menu"""
    return await handle_menu_calls()

@app.get("/api/food/recipes/{call_id}", response_model=Recipe)
@app.get("/api/drink/recipes/{call_id}", response_model=Recipe)
@app.get("/food/recipes/{call_id}", response_model=Recipe)
@app.get("/drink/recipes/{call_id}", response_model=Recipe)
async def recipe_from_id(call_id: str):
    """Handles API calls for recipe retrieval based on ID"""
    recipe = handle_id_calls(call_id)
    return recipe

@app.get("/api/drink/recipes", response_model=List[Recipe])
@app.get("/drink/recipes", response_model=List[Recipe])
async def get_random_drink_recipes(limit: int = 10):
    """Get a list of random drink recipes."""
    thecocktaildb = await get_thecocktaildb()
    content_filter = ContentFilter(thecocktaildb)
    drinks = content_filter.get_n_random(limit)
    recipes = [convert_to_recipe(drink) for drink in drinks]
    return recipes

@app.get("/api/ingredients/{call_id}", response_model=Ingredient)
@app.get("/ingredients/{call_id}", response_model=Ingredient)
async def ingredients_by_id(call_id: str):
    """Get ingredient by id"""
    print("call id: " + call_id)
    ingredient = handle_ingredient_calls(call_id)
    return ingredient

@app.get("/api/image", response_model=ImageURL)
@app.get("/image", response_model=ImageURL)
async def get_image(query: str):
    """Get image by query"""
    pixabay = await get_pixabay()
    image_url = pixabay.get_image_by_query(query)
    if not image_url:
        return ImageURL(url="")
    return ImageURL(url=image_url)

@app.get("/api/search", response_model=SearchResult)
@app.get("/search", response_model=SearchResult)
async def get_search_results(query: str):
    """Get search results by query"""
    search_results = handle_name_search_calls(query)
    return search_results

@app.get("/api/search/ingredients", response_model=SearchResult)
@app.get("/search/ingredients", response_model=SearchResult)
async def get_search_ingredients(query: str):
    """Get search ingredients by query"""
    mealdb = await get_themealdb()
    search_results = mealdb.search_for_recipe_by_ingredients(query)
    r = []
    for x in search_results:
        r.append(convert_to_search_results(x))
    return combine_search_results(*r)

@app.get("/api/ai/description/{query}", response_model=AIResponseText)
@app.get("/ai/description/{query}", response_model=AIResponseText)
async def get_ai_description(query: str):
    """Get AI description by query"""
    aibase = await get_aibase()
    description = aibase.query_for_description(query)
    return AIResponseText(text=description)

@app.get("/api/ai/substitutions/{query}", response_model=AIResponseText)
@app.get("/ai/substitutions/{query}", response_model=AIResponseText)
async def get_ai_substitution(query: str):
    """Get AI substitution by query"""
    aibase = await get_aibase()
    substitution = aibase.query_for_substitutions(query)
    return AIResponseText(text=substitution)

@app.get("/api/ai/chat", response_model=AIResponseText)
@app.get("/ai/chat", response_model=AIResponseText)
async def ai_chat(message: str, context: str = ""):
    """Get AI chat response by message"""
    # TODO: Change this to take a json body message. These URL's are huge with context.
    aibase = await get_aibase()
    response_message = aibase.chat(message, context if context not in ["", None] else None)
    return AIResponseText(text=response_message)

@app.post("/api/auth/login", response_model=User)
@app.post("/auth/login", response_model=User)
def login(login_request: LoginRequest, db: Session = Depends(database.get_db)):
    user = crud.get_user_by_username(db, login_request.username)
    if not user or user.password != login_request.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    return user

@app.post("/api/auth/signup", response_model=User)
@app.post("/auth/signup", response_model=User)
def signup(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    return crud.create_user(db, user)

@app.post("/api/recipes/save", response_model=User)
@app.post("/recipes/save", response_model=User)
def save_recipe(recipe_request: SaveRecipeRequest, db: Session = Depends(database.get_db)):
    updated_user = crud.save_recipe(
        db,
        recipe_request.username,
        recipe_request.recipeName,
        recipe_request.recipeId,
        recipe_request.recipeType
    )
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return updated_user

@app.post("/api/menu/save")
@app.post("/menu/save")
def save_menu(menu_save_request: SaveMenuRequest, db: Session = Depends(database.get_db)):
    try:
        handle_save_menu(menu_save_request.menu, menu_save_request.user_id, menu_save_request.name, db)
    except Exception as e:
        logging.error(f"Exception saving menu: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return status.HTTP_200_OK

@app.get("/api/menu/get", response_model=list[Menu])
@app.get("/menu/get", response_model=list[Menu])
def get_saved_menus(user_id: int, db: Session = Depends(database.get_db)):
    try:
        return handle_get_menus(user_id, db)
    except Exception as e:
        logging.error(f"Exception fetching menus: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@app.get("/status")
async def status_report():
    return "SHHHH Hobbes is sleeping on the couch"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)