from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class Ingredient(BaseModel):
    id: int
    name: str
    measurement: str
    description: str


class Recipe(BaseModel):
    id: str
    title: str
    description: str
    instructions: str
    imageURL: str
    ingredients: List[Ingredient]


class ImageURL(BaseModel):
    url: str

class _SearchResult(BaseModel):
    database: str
    recipe: Optional[Recipe] = None
    ingredient: Optional[Ingredient] = None

class SearchResult(BaseModel):
    results: List[_SearchResult]

class AIResponseText(BaseModel):
    text: str


def convert_to_recipe(item: Dict[str, Any]) -> Recipe:
    """
    Converts a meal or drink dictionary to a Recipe object, automatically
    detecting the item type.

    Args:
        item: A dictionary representing either a meal or a drink.

    Returns:
        A Recipe object, or None if the item type cannot be determined.
    """

    if 'meals' in item:
        item_type = 'meal'
        key = 'meals'
    elif 'drinks' in item:
        item_type = 'drink'
        key = 'drinks'
    else:
        raise ValueError("Could not determine item type (meal or drink).")

    item = item[key][0] if isinstance(item[key], list) else item[key]

    ingredient_count = 21 if item_type == 'meal' else 16
    ingredients: List[Ingredient] = []
    for i in range(1, ingredient_count):
        ingredient_name = item.get(f"strIngredient{i}")
        ingredient_measure = item.get(f"strMeasure{i}")
        if ingredient_name and ingredient_measure:
            ingredients.append(
                Ingredient(id=i, name=ingredient_name, measurement=ingredient_measure, description="")
            )

    id_key = f"id{item_type.capitalize()}"
    name_key = f"str{item_type.capitalize()}"

    return Recipe(
        id=item[id_key],
        title=item[name_key],
        description=item.get("strCategory") or "",
        instructions=item.get("strInstructions") or "",
        imageURL=item.get(f"str{item_type.capitalize()}Thumb") or "",
        ingredients=ingredients,
    )


def convert_to_ingredient(item: Dict[str, Any]) -> Ingredient:
    """Converts a dictionary to an Ingredient object.

    Args:
        item: A dictionary containing ingredient data.

    Returns:
        An Ingredient object.
    """
    ingredient_data = item
    return Ingredient(
        id=int(ingredient_data['idIngredient']),
        name=ingredient_data['strIngredient'],
        measurement="",
        description=ingredient_data['strDescription'] or ""
    )


def convert_to_search_results(json_data: Dict[str, Any]) -> SearchResult:
    """
    Converts JSON data from MealDB or CocktailDB API into a SearchResult object.
    Uses the existing conversion functions to process the data.

    Args:
        json_data: A dictionary containing either a 'meals' or 'drinks' key with an array of items

    Returns:
        A SearchResult object containing a list of _SearchResult objects
    """
    if 'meals' in json_data and json_data['meals']:
        items = json_data['meals']
        database_code = 'M'
        convert_function = convert_to_recipe
    elif 'drinks' in json_data and json_data['drinks']:
        items = json_data['drinks']
        database_code = 'D'
        convert_function = convert_to_recipe
    else:
        raise ValueError("Input JSON must contain either a non-empty 'meals' or 'drinks' array")

    search_results: List[_SearchResult] = []

    for item_data in items:
        if database_code == 'M':
            single_item_data = {'meals': [item_data]}
        else:
            single_item_data = {'drinks': [item_data]}

        recipe = convert_function(single_item_data)

        result = _SearchResult(
            database=database_code,
            recipe=recipe,
            ingredient=None
        )

        search_results.append(result)

    return SearchResult(results=search_results)


def combine_search_results(*search_results: SearchResult) -> SearchResult:
    """
    Combines multiple SearchResult objects into a single SearchResult
    containing all items from all the input search results.

    Args:
        *search_results: Variable number of SearchResult objects to combine

    Returns:
        A new SearchResult object containing all items from all input search results
    """
    all_results: List[_SearchResult] = []

    for sr in search_results:
        if sr and sr.results:
            all_results.extend(sr.results)

    return SearchResult(results=all_results)
