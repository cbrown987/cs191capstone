from functools import wraps
from flask import jsonify
from jsonschema import validate
import requests

from api.util.exceptions import APINotImplementedException


class BaseDB:
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

    SCHEMAS = {
        "INGREDIENT": INGREDIENT,
        "RECIPE": RECIPE,
        "RECIPE_ARRAY": RECIPE_ARRAY
    }

    def __init__(self, json_input, schema_type=None):
        self.schema = self.SCHEMAS[schema_type]
        _conversion_strategy = {
            "INGREDIENT": self._convert_ingredient,
            "RECIPE": self._convert_recipe,
            "RECIPE_ARRAY": self._convert_recipe_array
        }
        self.json_input = json_input

        self.converted_json = _conversion_strategy.get(schema_type)(json_input)
        self._verify()


    def _verify(self):
        return validate(instance=self.converted_json, schema=self.schema)


    def _convert_ingredient(self, *args):
        id_key = "idIngredient"
        name_key = "strIngredient"
        measurement_key = "strIngredient"
        description_key = "strDescription"

        ingredient = {
            "id": int(self.json_input.get(id_key)),
            "name": self.json_input.get(name_key),
            "measurement": self.json_input.get(measurement_key),
            "description": self.json_input.get(description_key)
        }
        return ingredient

    def _convert_recipe(self, _db_api=None, json_input_override=None):
        recipe_json_input = self.json_input
        if json_input_override:
            recipe_json_input = json_input_override
        if "meals" in recipe_json_input or (_db_api == "meal") :
            json_value = recipe_json_input["meals"]
            if isinstance(json_value, list):
                json_value = json_value[0]
            id_key = "idMeal"
            title_key = "strMeal"
            thumb_key = "strMealThumb"
            max_ingredients = 20
        elif "drinks" in recipe_json_input or (_db_api == "drinks") :
            json_value = recipe_json_input["drinks"]
            if isinstance(json_value, list):
                json_value = json_value[0]
            id_key = "idDrink"
            title_key = "strDrink"
            thumb_key = "strDrinkThumb"
            max_ingredients = 15
        else:
            raise ValueError("Cannot determine API response from JSON")

        output = {
            "id": int(json_value[id_key]),
            "title": json_value[title_key],
            "description": None,
            "instructions": json_value["strInstructions"],
            "imageURL": json_value[thumb_key],
            "ingredients": []
        }

        for i in range(1, max_ingredients + 1):
            ingredient_name = json_value.get(f"strIngredient{i}")
            measure = json_value.get(f"strMeasure{i}")
            if ingredient_name and ingredient_name.strip():
                output["ingredients"].append({
                    "id": None,
                    "name": ingredient_name.strip(),
                    "measurement": measure.strip() if measure and measure.strip() else None
                })

        return output

    def _convert_recipe_array(self, *args):
        recipe_array = []
        _db_api = None
        if "meals" in self.json_input:
            _db_api = "meals"
        elif "drinks" in self.json_input:
            _db_api = "drinks"
        for value in self.json_input[_db_api]:
            recipe_array.append(self._convert_recipe(
                _db_api=_db_api,
                json_input_override=value
            ))



def standardize_api(schema_type=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            return jsonify(StandardizeAPI(result, schema_type=schema_type).converted_json)
        return wrapper
    return decorator



