import requests

from api.util.exceptions import APINotImplementedException

class BaseEndpoint:
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
        if responce.status_code != requests.codes.ok:
            raise Exception(responce.status_code)
        return self.decode(responce)

    def decode(self, response):
        """
        An abstract decode function. Must be defined in subclasses.
        :param response: The response from an API call.
        """
        raise NotImplementedError()


class BaseDB(BaseEndpoint):
    """Abstract class for APIDB calls"""

    def get_image(self, query):
        """An abstract get image function. Must be defined in subclasses."""
        raise NotImplementedError()

    # Abstract functions that we want to be able to check if are implemented for All API calls
    def search_by_name(self, query):
        raise APINotImplementedException()

    def get_one_random(self):
        raise APINotImplementedException()

    def search_by_id(self, query):
        raise APINotImplementedException()

    def get_n_random(self, n):
        raise APINotImplementedException()



