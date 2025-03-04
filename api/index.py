from flask import Flask

from api.endpoints.base import standardize_api
from api.endpoints.thedb import TheMealDB, TheCocktailDB
from api.util.handlers import handle_id_calls

app = Flask(__name__)

@app.route('/api/food/recipes', methods=['GET', 'POST'])
@standardize_api
def food_recipes():
    """
    Get 10 random food recipes
    """
    return TheMealDB().get_n_random(4)

@app.route('/api/food/recipes/<string:call_id>', methods=['GET', 'POST'])
@app.route('/api/drink/recipes/<string:call_id>', methods=['GET', 'POST'])
@standardize_api
def recipe_from_id(call_id):
    """
    Handles API calls for recipe retrieval based on ID
    calls are in the form <API>+<ID>
    """
    return handle_id_calls(call_id)

@app.route('/api/drink/recipes', methods=['GET', 'POST'])
@standardize_api
def drink_recipes():
    """
    Get 10 random drink recipes
    """
    return TheCocktailDB().get_n_random(4)


@app.route('/api/ingredients/', methods=['GET', 'POST'])
@standardize_api
def ingredients():
    # POST: submit or edit ingredients
    # GET retrieve the user's ingredients saved
    pass


if __name__ == '__main__':
    app.run(debug=True)

