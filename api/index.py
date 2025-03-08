import logging

from flask import Flask
from flask_cors import CORS

from api.config import Config
from api.endpoints.AI.AI_base import AIBase
from api.endpoints.base import standardize_api, verify_next_client
from api.endpoints.photos.pixabay import Pixabay
from api.endpoints.thedb import TheMealDB, TheCocktailDB
from api.util.handlers import handle_id_calls, handle_ingredient_calls

app = Flask(__name__)
CORS(app)

@app.route('/api/food/recipes', methods=['GET', 'POST'])
@standardize_api(schema_type='RECIPE_ARRAY')
def food_recipes():
    """
    Get 10 random food recipes
    """
    return TheMealDB().get_n_random(4)

@app.route('/api/food/recipes/<string:call_id>', methods=['GET', 'POST'])
@app.route('/api/drink/recipes/<string:call_id>', methods=['GET', 'POST'])
@standardize_api(schema_type='RECIPE')
def recipe_from_id(call_id):
    """
    Handles API calls for recipe retrieval based on ID
    calls are in the form <API>+<ID>
    """
    return handle_id_calls(call_id)

@app.route('/api/drink/recipes', methods=['GET', 'POST'])
@standardize_api(schema_type='RECIPE_ARRAY')
def drink_recipes():
    """
    Get 10 random drink recipes
    """
    return TheCocktailDB().get_n_random(4)


@app.route('/api/ingredients/<string:call_id>', methods=['GET', 'POST'])
@standardize_api(schema_type='INGREDIENT')
def ingredients_by_id(call_id):
    return handle_ingredient_calls(call_id)


@app.route('/api/image/<string:query>', methods=['GET', 'POST'])
@standardize_api(schema_type='IMAGE_URL')
def get_image(query):
    return Pixabay().get_image_by_query(query)

@app.route('/api/ai/description/<string:query>', methods=['GET', 'POST'])
@standardize_api(schema_type='AI_RESPONSE_TEXT')
def get_ai_description(query):
    return AIBase().query_for_description(query)

@app.route('/api/ai/substitutions/<string:query>', methods=['GET', 'POST'])
@standardize_api(schema_type='AI_RESPONSE_TEXT')
def get_ai_substitution(query):
    return AIBase().query_for_substitutions(query)


if app.debug:
    file_handler = logging.FileHandler('flask-app.log')
    file_handler.setLevel(logging.WARNING)
    app.logger.addHandler(file_handler)


if __name__ == '__main__':
    app.run(debug=True)

