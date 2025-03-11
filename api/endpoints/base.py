import logging
from functools import wraps
from flask import jsonify, request, abort
from jsonschema import validate
import requests

from api.config import Config
from api.util.exceptions import APINotImplementedException

class BaseEndpoint:
    """Abstract class for API calls"""
    def __init__(self, endpoint, headers = None):
        self.endpoint = endpoint
        self.headers = headers

    def get(self, route = None):
        """
        Basic Get call
        :param route: A route endpoint to add to the end of an endpoint link.
        """
        url = "https://" + self.endpoint + route
        responce = requests.get(url, self.headers)
        if responce.status_code != requests.codes.ok:
            raise Exception(responce.status_code)
        return self.decode(responce)

    def decode(self, response):
        """
        An abstract decode function. Must be defined in subclasses.
        :param response: The response from an API call.
        """
        raise NotImplementedError()


class BaseDB(BaseEndpoint):
    """Abstract class for APIDB calls"""

    def get_image(self, query):
        """An abstract get image function. Must be defined in subclasses."""
        raise NotImplementedError()

    # Abstract functions that we want to be able to check if are implemented for All API calls
    def search_by_name(self, query):
        raise APINotImplementedException()

    def get_one_random(self):
        raise APINotImplementedException()

    def search_by_id(self, query):
        raise APINotImplementedException()

    def get_n_random(self, n):
        raise APINotImplementedException()


class StandardizeAPI:
    """
    Standardize the output of an API call.
    """
    # database identifiers
    DB_MEALS = "meals"
    DB_DRINKS = "drinks"
    DB_INGREDIENTS = "ingredients"


    INGREDIENT = {
        "type": ["object"],
        "properties": {
            "id": {"type": ["integer", "null"]},
            "name": {"type": "string"},
            "measurement": {"type": ["string", "null"]},
            "description": {"type": ["string", "null"]}
        }
    }
    _INGREDIENT_ARRAY = {
        "type": "array",
        "items": INGREDIENT
    }
    RECIPE = {
        "type": "object",
        "properties": {
            "id": {"type": "integer"},
            "title": {"type": "string"},
            "description": {"type": ["string", "null"]},
            "instructions": {"type": "string"},
            "imageURL": {"type": "string"},
            "ingredients": _INGREDIENT_ARRAY,
        }
    }
    RECIPE_ARRAY = {
        "type": "array",
        "items": RECIPE,
    }

    IMAGE_URL = {
        "type": ["string", "null"],
        "pattern": r"^https?:\/\/.*\.(?:png|jpg|jpeg)$"
    }

    AI_RESPONSE_TEXT = {
        "type": "string"
    }

    _SEARCH_RESULTS_OBJECT = {
        "type": "object",
        "properties": {
            "database": {"type": "string"},
            "recipe": {"oneOf": [{"type": "null"}, RECIPE]},
            "ingredient": {"oneOf": [{"type": "null"}, INGREDIENT]},
        }
    }

    SEARCH_RESULTS = {
        "type": "array",
        "items": _SEARCH_RESULTS_OBJECT
    }


    SCHEMAS = {
        "INGREDIENT": INGREDIENT,
        "RECIPE": RECIPE,
        "RECIPE_ARRAY": RECIPE_ARRAY,
        "IMAGE_URL": IMAGE_URL,
        "AI_RESPONSE_TEXT": AI_RESPONSE_TEXT,
        "SEARCH_RESULTS": SEARCH_RESULTS,
    }

    def __init__(self, json_input, schema_type=None):
        """
        Initialize StandardizeAPI with input JSON and a schema type.

        Args:
            json_input: The JSON input to be standardized
            schema_type: The schema type to use for standardization
        """
        if schema_type not in self.SCHEMAS:
            raise ValueError(f"Invalid schema type: {schema_type}")

        self.schema = self.SCHEMAS[schema_type]
        self.json_input = json_input

        conversion_map = {
            "INGREDIENT": self.convert_ingredient,
            "RECIPE": self.convert_recipe,
            "RECIPE_ARRAY": self._convert_recipe_array,
            "IMAGE_URL": self._convert_image_url,
            "AI_RESPONSE_TEXT": self._convert_ai_response,
            "SEARCH_RESULTS": self._convert_search_results,
        }

        converter = conversion_map.get(schema_type)
        if not converter:
            raise ValueError(f"No converter for schema type: {schema_type}")

        self.converted_json = converter()
        self._verify()

    def _verify(self):
        return validate(instance=self.converted_json, schema=self.schema)

    def convert_ingredient(self, json_input=None):
        """
        Convert ingredient JSON to standardized format.

        Args:
            json_input: Optional JSON input to override self.json_input

        Returns:
            Standardized ingredient object
        """
        json_value = json_input or self.json_input

        if not json_value:
            return None
        # TODO: I hate this code
        if isinstance(json_value, dict) and "ingredients" in json_value:
            try:
                json_value = json_value["ingredients"][0]
            except (KeyError, IndexError, TypeError):
                pass

        id_key = "idIngredient"
        name_key = "strIngredient"
        measurement_key = "strMeasure"
        description_key = "strDescription"

        if name_key not in json_value:
            return None

        ing_id = json_value.get(id_key)

        return {
            "id": int(ing_id) if ing_id and isinstance(ing_id, str) and ing_id.isdigit() else None,
            "name": json_value[name_key],
            "measurement": json_value.get(measurement_key),
            "description": json_value.get(description_key)
        }

    @staticmethod
    def _extract_ingredients(json_value, max_ingredients):
        """
        Extract ingredients from a recipe JSON.

        Args:
            json_value: JSON object containing ingredient data
            max_ingredients: Maximum number of ingredients to extract

        Returns:
            List of standardized ingredients
        """
        ingredients = []

        for i in range(1, max_ingredients + 1):
            ingredient_name = json_value.get(f"strIngredient{i}")
            measure = json_value.get(f"strMeasure{i}")

            if ingredient_name and ingredient_name.strip():
                ingredients.append({
                    "id": None,
                    "name": ingredient_name.strip(),
                    "measurement": measure.strip() if measure and measure.strip() else None,
                    "description": None
                })

        return ingredients

    def convert_recipe(self, db_type=None, json_input=None):
        """
        Convert recipe JSON to standardized format.

        Args:
            db_type: Database type ('meals' or 'drinks')
            json_input: Optional JSON input to override self.json_input

        Returns:
            Standardized recipe object
        """
        recipe_json_input = json_input or self.json_input

        if not db_type:
            if "meals" in recipe_json_input:
                db_type = self.DB_MEALS
            elif "drinks" in recipe_json_input:
                db_type = self.DB_DRINKS
            else:
                logging.error(f"Cannot determine API response from JSON {recipe_json_input}")
                raise ValueError("Cannot determine API response from JSON")

        if db_type == self.DB_MEALS:
            json_value = recipe_json_input.get("meals", [])
            if json_value is None:
                return None
            if isinstance(json_value, list) and json_value:
                json_value = json_value[0]
            id_key = "idMeal"
            title_key = "strMeal"
            thumb_key = "strMealThumb"
            max_ingredients = 20
        elif db_type == self.DB_DRINKS:
            json_value = recipe_json_input.get("drinks", [])
            if json_value is None:
                return None
            if isinstance(json_value, list) and json_value:
                json_value = json_value[0]
            id_key = "idDrink"
            title_key = "strDrink"
            thumb_key = "strDrinkThumb"
            max_ingredients = 15
        else:
            raise ValueError(f"Unsupported database type: {db_type}")

        output = {
            "id": int(json_value[id_key]),
            "title": json_value[title_key],
            "description": None,
            "instructions": json_value["strInstructions"],
            "imageURL": json_value[thumb_key],
            "ingredients": self._extract_ingredients(json_value, max_ingredients)
        }

        return output

    def _convert_recipe_array(self):
        """
        Convert an array of recipes to standardized format.

        Returns:
            Array of standardized recipe objects
        """
        recipe_array = []
        json_input = self.json_input

        if isinstance(json_input, tuple):
            json_input = json_input[0]

        db_type = None
        if "meals" in json_input:
            db_type = self.DB_MEALS
        elif "drinks" in json_input:
            db_type = self.DB_DRINKS

        for value in json_input:
            recipe_array.append(self.convert_recipe(db_type=db_type, json_input=value))

        return recipe_array

    def _convert_image_url(self):
        """Convert image URL to standardized format."""
        return self.json_input

    def _convert_ai_response(self):
        """Convert AI response to standardized format."""
        return self.json_input

    def _convert_search_results(self):
        """
        Convert search results to standardized format.

        Returns:
            Array of standardized search result objects
        """
        converted_results = []

        for result in self.json_input:
            if 'meals' in result:
                # Handle meal results
                meals = result['meals']
                if isinstance(meals, list):
                    for meal in meals:
                        meal_data = {"meals": [meal]}
                        recipe = self.convert_recipe(db_type=self.DB_MEALS, json_input=meal_data)
                        converted_results.append({
                            "database": "M",
                            "recipe": recipe,
                            "ingredient": None
                        })
                else:
                    recipe = self.convert_recipe(db_type=self.DB_MEALS, json_input=result)
                    if recipe:
                        converted_results.append({
                            "database": "M",
                            "recipe": recipe,
                            "ingredient": None
                        })
            elif 'drinks' in result:
                recipe = self.convert_recipe(db_type=self.DB_DRINKS, json_input=result)
                if recipe:
                    converted_results.append({
                        "database": "C",
                        "recipe": recipe,
                        "ingredient": None
                    })
            else:
                # TODO: Fix this hacky shit I wrote for demo
                ingredient = self.convert_ingredient(json_input=result)
                if ingredient:
                    database = "IM"
                    try:
                        if 'strABV' in result['ingredients'][0]:
                            database = "IC"
                    except (KeyError, IndexError):
                        pass
                    try:
                        if 'strABV' in result['ingredient'][0]:
                            database = "IC"
                    except (KeyError, IndexError):
                        pass
                    converted_results.append({
                        "database": database,
                        "recipe": None,
                        "ingredient": ingredient
                    })

        return converted_results


def standardize_api(schema_type=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            return jsonify(StandardizeAPI(result, schema_type=schema_type).converted_json)
        return wrapper
    return decorator


def verify_next_client(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        origin = request.headers.get('Origin')
        if not origin:
            origin = request.headers.get('Host')
        if not origin or origin not in Config.ALLOWED_ORIGINS:
            abort(403)
        return func(*args, **kwargs)
    return decorated_function



