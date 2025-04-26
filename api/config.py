import logging
import os
from dotenv import load_dotenv

load_dotenv(verbose=False)

class Config:
    """
    Handles configuration management for the application.

    This class is designed to manage and store configuration variables crucial
    for the application, such as API keys.
    """
    API_NINJAS_KEY = os.getenv('API_NINJAS_KEY', '')
    API_PIXABAY_KEY = os.getenv('API_PIXABAY_KEY', '')
    API_HYPERBOLIC_KEY = os.getenv('API_HYPERBOLIC_KEY', '')

    AWS_USER = os.getenv('AWS_USER', '')
    AWS_PASSWORD = os.getenv('AWS_PASSWORD', '')
    AWS_HOST = os.getenv('AWS_HOST', '')
    AWS_PORT = os.getenv('AWS_PORT', '')
    AWS_DATABASE = os.getenv('AWS_DATABASE', '')
    if AWS_PORT:
        DATABASE_URL = f"postgresql://{AWS_USER}:{AWS_PASSWORD}@{AWS_HOST}:{AWS_PORT}/{AWS_DATABASE}"
    else:
        DATABASE_URL = f"postgresql://{AWS_USER}:{AWS_PASSWORD}@{AWS_HOST}/{AWS_DATABASE}"

    @classmethod
    def get_secret(cls, key_name):
        """Retrieves the value of a specified secret key from the class."""
        return getattr(cls, key_name, '')