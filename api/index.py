from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.util.conversions import Recipe, Ingredient, ImageURL, SearchResult, AIResponseText, convert_to_recipe

from api.endpoints import TheMealDB, TheCocktailDB
from api.endpoints.AI.AI_base import AIBase
from api.endpoints.photos.pixabay import Pixabay
from api.util.handlers import handle_id_calls, handle_ingredient_calls, handle_name_search_calls

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
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
async def food_recipes():
    themealdb = await get_themealdb()
    meals = themealdb.get_n_random(4)
    recipes = [convert_to_recipe(meal) for meal in meals]
    return recipes



@app.get("/api/food/recipes/{call_id}", response_model=Recipe)
@app.get("/api/drink/recipes/{call_id}", response_model=Recipe)
async def recipe_from_id(call_id: str):
    """Handles API calls for recipe retrieval based on ID"""
    recipe = handle_id_calls(call_id)
    return recipe


@app.get("/api/drink/recipes", response_model=List[Recipe])
async def get_random_drink_recipes():
    """Get a list of random drink recipes."""
    thecocktaildb = await get_thecocktaildb()
    drinks = thecocktaildb.get_n_random(4)
    recipes = [convert_to_recipe(drink) for drink in drinks]
    return recipes



@app.get("/api/ingredients/{call_id}", response_model=Ingredient)
async def ingredients_by_id(call_id: str):
    """Get ingredient by id"""
    print("call id: " + call_id)
    ingredient = handle_ingredient_calls(call_id)
    return ingredient


@app.get("/api/image", response_model=ImageURL)
async def get_image(query: str):
    """Get image by query"""
    pixabay = await get_pixabay()
    image_url = pixabay.get_image_by_query(query)
    if not image_url:
        return ImageURL(url="")
    return ImageURL(url=image_url)



@app.get("/api/search", response_model=SearchResult)
async def get_search_results(query: str):
    """Get search results by query"""
    search_results = handle_name_search_calls(query)
    return search_results


@app.get("/api/ai/description/{query}", response_model=AIResponseText)
async def get_ai_description(query: str):
    """Get AI description by query"""
    aibase = await get_aibase()
    description = aibase.query_for_description(query)
    return AIResponseText(text=description)


@app.get("/api/ai/substitutions/{query}", response_model=AIResponseText)
async def get_ai_substitution(query: str):
    """Get AI substitution by query"""
    aibase = await get_aibase()
    substitution = aibase.query_for_substitutions(query)
    return AIResponseText(text=substitution)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5328)
