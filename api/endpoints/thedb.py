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

    def search_by_category(self, category):
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
        route = "/lookup.php?i="
        return self.get(route + str(query))


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
        return self._search_by(query)

    def search_ingredient(self, ingredient):
        return self._search_by(ingredient)

    def search_ingredient_by_name(self, ingredient):
        route = "search.php?i=" + ingredient
        return self.get(route)

    def lookup_ingredient_by_id(self, ingredient_id):
        """
        Looks up a cocktail ingredient by its numeric ID.
        Validates that the ingredient ID is numeric before making the API call.
        :param ingredient_id: The numeric ID of the ingredient.
        :raises ValueError: If the ingredient ID is not numeric.
        """
        if not ingredient_id.isdigit():
            raise ValueError("Ingredient ID must be numeric.")
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
