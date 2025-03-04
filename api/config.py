import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """
    Handles configuration management for the application.

    This class is designed to manage and store configuration variables crucial
    for the application, such as API keys.
    """
    API_NINJAS_KEY = os.getenv('API_NINJAS_KEY', '')

    @classmethod
    def get_secret(cls, key_name):
        """Retrieves the value of a specified secret key from the class."""
        return getattr(cls, key_name, '')