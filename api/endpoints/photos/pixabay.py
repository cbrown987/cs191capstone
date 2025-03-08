from urllib.parse import quote
from api.config import Config
from api.endpoints.base import BaseEndpoint


class Pixabay(BaseEndpoint):
    def __init__(self):
        api_key = Config.get_secret('API_PIXABAY_KEY')
        if not api_key:
            raise EnvironmentError("The API key for pixabay is missing. Set it in the environment.")
        base_url = "pixabay.com/api/"
        url = f"{base_url}?key={api_key}"
        super().__init__(
            endpoint=url
        )

    def decode(self, response):
        r = response.json()
        if r['totalHits'] == 0:
            return None
        hits = r['hits'][0]
        if hits:
            return hits['largeImageURL']

    def get_image_by_query(self, query):
        encoded_query = quote(query)
        route = f"&q={encoded_query}&image_type=photo"
        return self.get(route)
