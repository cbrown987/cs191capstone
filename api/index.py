from flask import Flask
app = Flask(__name__)

@app.route('/api/recipes', methods=['GET', 'POST'])
def recipes():
    # Get a number of random recipes
    pass

@app.route('/api/recipes/<int:id>', methods=['GET', 'POST'])
def recipe(id):
    # Get a specific recipe by ID
    pass

@app.route('/api/ingredients/', methods=['GET', 'POST'])
def ingredients():
    # POST: submit or edit ingredients
    # GET retrieve the user's ingredients saved
    pass


if __name__ == '__main__':
    app.run(debug=True)

