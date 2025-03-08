from datetime import datetime, timedelta

from api.endpoints.base import BaseDB

class BaseTheDB(BaseDB):
    """
    Abstract base class for both TheMealDB and TheCocktailDB API clients.
    This class extends BaseDB and provides common functionality such as setting up the endpoint,
    decoding responses as JSON, and various basic API query methods.
    """

    def __init__(self, base_url, headers=None):
        """
        Initializes the BaseTheDB client.

        Constructs the API endpoint by appending a basic API key ("1") to the base URL.
        This API key is for free API calls and is limited.

        :param base_url: The basic URL of the API (e.g., "www.themealdb.com/api/json/v1")
        :param headers: Optional headers to include in the HTTP requests.
        """
        api_key = "1"  # Basic API key for free API calls.
        endpoint = base_url + "/" + api_key + "/"
        super().__init__(endpoint, headers)

    def decode(self, response):
        """
        Decodes the API response as JSON.
        :param response: The HTTP response object returned by an API call.
        """
        return response.json()

    def search_by_name(self, query):
        """
        Searches for an item (meal or cocktail) by its name.
        :param query: The name or keyword to search for.
        """
        route = "search.php?s=" + query
        return self.get(route)

    def get_one_random(self):
        return self.get("random.php")

    def list_all_categories(self):
        return self.get("list.php?c=list")

    def list_all_ingredients(self):
        return self.get("list.php?i=list")

    def list_by_category(self, category):
        route = "filter.php?c=" + category
        return self.get(route)

    def list_categories(self):
        return self.get("categories.php")


class TheMealDB(BaseTheDB):
    """Client for TheMealDB API."""

    def __init__(self):
        """Initializes the TheMealDB client"""
        base_url = "www.themealdb.com/api/json/v1"
        super().__init__(base_url=base_url)

    def list_all_areas(self):
        return self.get("list.php?a=list")

    def search_by_ingredient(self, ingredient):
        route = "filter.php?i=" + ingredient
        return self.get(route)

    def search_by_area(self, area):
        route = "filter.php?a=" + area
        return self.get(route)

    def search_by_id(self, query):
        route = "lookup.php?i="
        return self.get(route + str(query))

    def get_n_random(self, n):
        """
        Because we do not have a premium API we can mock it here. This function is not sutible for scale.
        """
        # This is hacky and not very nice. But we need 10 and we don't want duplicates
        _recipes = []
        seen_ids = set()
        for _ in range(10):
            response = self.get_one_random()
            if response and "meals" in response and response["meals"]:
                recipe_id = response["meals"][0]["idMeal"]
                if recipe_id not in seen_ids:
                    seen_ids.add(recipe_id)
                    _recipes.append(response)
        return _recipes

    def _refresh_ingredients_cache(self):
        """Helper method to refresh the ingredients cache"""
        all_ingredients = self.list_all_ingredients()
        self._ingredients_dict = {
            ingredient['strIngredient'].lower(): ingredient
            for ingredient in all_ingredients['meals']
        }
        self._ingredients_dict_by_id = {
            str(i): ingredient
            for i, ingredient in enumerate(all_ingredients['meals'])
        }
        self._ingredients_cache_time = datetime.now()
        return all_ingredients

    def _get_ingredient_by_name(self, name):
        """
        Gets an ingredient by name (case-insensitive).
        Uses dictionary-based lookup with daily refresh for better performance.
        """
        current_time = datetime.now()

        if (not hasattr(self, '_ingredients_dict') or
                not hasattr(self, '_ingredients_cache_time') or
                current_time - self._ingredients_cache_time > timedelta(days=1)):
            self._refresh_ingredients_cache()

        return self._ingredients_dict.get(name.lower())

    def get_ingredient_by_id(self, i_id):
        """
        Gets an ingredient by ID. Uses the shared cache for better performance.
        """
        current_time = datetime.now()

        if (not hasattr(self, '_ingredients_dict') or
                not hasattr(self, '_ingredients_dict_by_id') or
                not hasattr(self, '_ingredients_cache_time') or
                current_time - self._ingredients_cache_time > timedelta(days=1)):
            all_ingredients = self._refresh_ingredients_cache()
            return all_ingredients['meals'][int(i_id)] if i_id.isdigit() else self._get_ingredient_by_name(i_id)

        if i_id.isdigit():
            return self._ingredients_dict_by_id.get(i_id)
        else:
            return self._get_ingredient_by_name(i_id)
    
    def search_by_ingredients(self, *args):
        """
        Get meals id by multiple ingredients
        """
        all_suggestions = []
        ids = []

        for ingredient in args:
            all_suggestions += self.search_by_ingredient(ingredient)

        for id in all_suggestions:
            if all_suggestions.count(id) > 1 and id not in meals:
                ids.append(id)
        
        index = 0
        while len(ids) < 6:
            ids.append(all_suggestions[index * len(args)])
            index += 1
        
        meals = []
        for id in ids:
            meals.append(self.search_by_id(id))
        
        return meals

class TheCocktailDB(BaseTheDB):
    """Client for TheCocktailDB API."""

    def __init__(self):
        """Initializes the TheCocktailDB client"""
        base_url = "www.thecocktaildb.com/api/json/v1"
        super().__init__(base_url=base_url)

    def _search_by(self, query):
        """
        Private helper method to search for cocktails or ingredients by a query.
        :param query: The search parameter (could be an ID or ingredient).
        """
        route = "/lookup.php?i=" + query
        return self.get(route)

    def search_by_id(self, query):
        return self._search_by(str(query))

    def search_by_ingredient(self, ingredient):
        return self._search_by(ingredient)

    def search_ingredient_by_name(self, ingredient):
        route = "search.php?i=" + ingredient
        return self.get(route)

    def get_ingredient_by_id(self, ingredient_id):
        if not ingredient_id.isdigit():
            return self.search_ingredient_by_name(ingredient_id)
        route = "lookup.php?iid=" + ingredient_id
        return self.get(route)

    def filter_by_alcoholic(self, alcoholic):
        """
        Filters cocktails based on whether they are alcoholic or non-alcoholic.
        :param alcoholic: Boolean value; True for alcoholic, False for non-alcoholic.
        """
        if alcoholic:
            route = "/filter.php?a=Alcoholic"
        else:
            route = "/filter.php?a=Non_Alcoholic"
        return self.get(route)

    def search_by_glass(self, glass):
        route = "/filter.php?g=" + glass
        return self.get(route)

    def list_all_glasses(self):
        return self.get("list.php?g=list")

    def get_n_random(self, n):
        """
        Because we do not have a premium API we can mock it here. This function is not sutible for scale.
        """
        # This is hacky and not very nice. But we need around 10, and we don't want duplicates
        _recipes = []
        seen_ids = set()
        for _ in range(10):
            response = self.get_one_random()
            if response and "drinks" in response and response["drinks"]:
                recipe_id = response["drinks"][0]["idDrink"]
                if recipe_id not in seen_ids:
                    seen_ids.add(recipe_id)
                    _recipes.append(response)
        return _recipes
