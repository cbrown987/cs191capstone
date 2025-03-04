from api.config import Config
from api.endpoints.base import BaseDB


class BaseApiNinjas(BaseDB):
    """
    Client for the Api Ninjas endpoints.
    This class allows interaction with the Api Ninjas API.
    """

    def __init__(self, api_name):
        """
        Initializes the ApiNinjas client by fetching the API key from the environment.
        """
        api_key = Config.get_secret('API_NINJAS_KEY')
        if not api_key:
            raise EnvironmentError("The API key for Api Ninjas is missing. Set it in the environment.")

        base_url = "api.api-ninjas.com/v1/"
        endpoint = base_url + api_name
        headers = {"X-Api-Key": api_key}
        super().__init__(endpoint=endpoint, headers=headers)


    def decode(self, response):
        return response.json()

    def get_image(self, query):
        # TODO: Find another way to get images from this. this DB does not implement Images
        pass


class NinjasCocktailAPI(BaseApiNinjas):
    """Interface for the cocktail API"""
    def __init__(self):
        api_name = "cocktail"
        super().__init__(
            api_name=api_name
        )

    def get_n_random(self, n=10):
        return self.get()

    def search_by_name(self, query):
        route = f"?name={query}"
        return self.get(route)

    def search_by_ingredient(self, ingredient):
        route = f"?ingredients={ingredient}"
        return self.get(route)

class NinjasRecipeAPI(BaseApiNinjas):
    """Interface for the food recipe API"""
    def __init__(self):
        api_name = "recipe"
        super().__init__(
            api_name=api_name
        )

    def search_by_name(self, query):
        route = f"?query={query}"
        return self.get(route)


