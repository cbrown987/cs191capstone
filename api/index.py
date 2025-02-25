from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/recipes', methods=['GET', 'POST'])
def recipes():
    default = [
        {
            "id": 1,
            "name": "French Fries",
            "description": "potatos fried",
            "type": "food"
        },
        {
            "id": 2,
            "name": "Mystery Meat",
            "description": "Possibly chicken, possibly not—it's the culinary equivalent of a plot twist.",
            "type": "food"

        },
        {
            "id": 3,
            "name": "Invisible Salad",
            "description": "A salad so elusive, even your fork can't find it.",
            "type": "food"

        },
        {
            "id": 4,
            "name": "Dragon Breath Chili Cocktail",
            "description": "So spicy, you'll breathe fire (or at least wish you could).",
            "type": "drink"

        },
        {
            "id": 5,
            "name": "Unicorn Milkshake",
            "description": "Rainbow-colored and magically delicious, but may cause sudden bursts of glitter.",
            "type": "drink"
    }
    ]

    return jsonify(default)

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

