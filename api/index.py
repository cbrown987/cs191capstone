import logging

from flask import Flask
from flask_cors import CORS

from api.endpoints.base import standardize_api
from api.endpoints.thedb import TheMealDB, TheCocktailDB
from api.util.handlers import handle_id_calls, handle_ingredient_calls

app = Flask(__name__)
CORS(app)

@app.route('/api/food/recipes', methods=['GET', 'POST'])
@standardize_api(schema_type='RECIPE')
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
@standardize_api(schema_type='RECIPE')
def drink_recipes():
    """
    Get 10 random drink recipes
    """
    return TheCocktailDB().get_n_random(4)


@app.route('/api/ingredients/<string:call_id>', methods=['GET', 'POST'])
@standardize_api(schema_type='INGREDIENT')
def ingredients_by_id(call_id):
    return handle_ingredient_calls(call_id)

if not app.debug:
    file_handler = logging.FileHandler('flask-app.log')
    file_handler.setLevel(logging.WARNING)
    app.logger.addHandler(file_handler)


if __name__ == '__main__':
    app.run(debug=True)

