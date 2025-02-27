from flask import Flask, jsonify

from api.endpoints.base import standardize_api
from api.endpoints.thedb import TheMealDB, TheCocktailDB

app = Flask(__name__)

@app.route('/api/food/recipes', methods=['GET', 'POST'])
@standardize_api
def food_recipes():
    """
    Get 10 random food recipes
    """
    return TheMealDB().get_10_random()

@app.route('/api/food/recipes/<int:id>', methods=['GET', 'POST'])
@standardize_api
def food_recipe(query_id):
    return TheMealDB().search_by_id(query_id)

@app.route('/api/drink/recipes', methods=['GET', 'POST'])
@standardize_api
def drink_recipes():
    """
    Get 10 random drink recipes
    """
    return TheCocktailDB().get_10_random()

@app.route('/api/drink/recipes/<int:id>', methods=['GET', 'POST'])
@standardize_api
def drink_recipe(query_id):
    return TheCocktailDB().search_by_id(query_id)




@app.route('/api/ingredients/', methods=['GET', 'POST'])
@standardize_api
def ingredients():
    # POST: submit or edit ingredients
    # GET retrieve the user's ingredients saved
    pass


if __name__ == '__main__':
    app.run(debug=True)

