from urllib.error import HTTPError
import requests

class BaseDB:
    """Abstract class for API calls"""

    def __init__(self, endpoint, headers = None):
        self.endpoint = endpoint
        self.headers = headers

    def get(self, route = None):
        """
        Basic Get call
        :param route: A route endpoint to add to the end of an endpoint link.
        """
        url = "https://" + self.endpoint + route
        responce = requests.get(url, self.headers)
        if responce.status_code != 200:
            raise HTTPError(responce.status_code, responce.text)
        return self.decode(responce)

    def decode(self, response):
        """
        An abstract decode function. Must be defined in subclasses.
        :param response: The response from an API call.
        """
        raise NotImplementedError()

    def get_image(self):
        """An abstract get image function. Must be defined in subclasses."""
        raise NotImplementedError()

