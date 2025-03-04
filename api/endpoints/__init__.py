# Expose API's to the endpoints package

from .thedb import TheMealDB, TheCocktailDB
from .ninjas import NinjasCocktailAPI, NinjasRecipeAPI

__all__ = [
    'TheMealDB',
    'TheCocktailDB',
    'NinjasCocktailAPI',
    'NinjasRecipeAPI',
]
