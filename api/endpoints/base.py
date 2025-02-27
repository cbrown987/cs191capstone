from functools import wraps
from flask import jsonify
from jsonschema import validate
import requests

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
        if responce.status_code != 200:
            raise Exception(responce.status_code)
        return self.decode(responce)

    def decode(self, response):
        """
        An abstract decode function. Must be defined in subclasses.
        :param response: The response from an API call.
        """
        raise NotImplementedError()

    def get_image(self):
        """An abstract get image function. Must be defined in subclasses."""
        raise NotImplementedError()



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
        }
    }
    _INGREDIENT_ARRAY = {
        "type": "array",
        "items": INGREDIENT
    }
    OUTPUT_OBJECT = {
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
    OUTPUT_ARRAY = {
        "type": "array",
        "items": OUTPUT_OBJECT,
    }

    def __init__(self, json_input):
        if isinstance(json_input, list):
            self.converted_json = []
            for item in json_input:
                self.converted_json.append(self._convert(item))
                self._verify()
        else:
            self.converted_json = self._convert(json_input)
            self._verify()


    def _verify(self):
        if isinstance(self.converted_json, list):
            return validate(instance=self.converted_json, schema=self.OUTPUT_ARRAY)
        return validate(instance=self.converted_json, schema=self.OUTPUT_OBJECT)

    @staticmethod
    def _convert(json_value):
        if "meals" in json_value:
            json_value = json_value["meals"][0]
            id_key = "idMeal"
            title_key = "strMeal"
            thumb_key = "strMealThumb"
            max_ingredients = 20
        elif "drinks" in json_value:
            json_value = json_value["drinks"][0]
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
            "instructions":json_value["strInstructions"],
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


def standardize_api(func):
    """A decorator for API calls to standardize the output of an API call."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return jsonify(StandardizeAPI(result).converted_json)
    return wrapper