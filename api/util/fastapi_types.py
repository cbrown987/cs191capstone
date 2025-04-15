from typing import List, Optional
from pydantic import BaseModel


class _MenuItem(BaseModel):
    name: str
    id: str
    category: str
    description: str


class Menu(BaseModel):
    food: List[_MenuItem]
    drinks: List[_MenuItem]


class Ingredient(BaseModel):
    id: int
    name: str
    measurement: str
    description: str


class Recipe(BaseModel):
    id: str
    title: str
    description: str
    instructions: str
    imageURL: str
    ingredients: List[Ingredient]


class ImageURL(BaseModel):
    url: str


class _SearchResult(BaseModel):
    database: str
    recipe: Optional[Recipe] = None
    ingredient: Optional[Ingredient] = None


class SearchResult(BaseModel):
    results: List[_SearchResult]

class AIResponseText(BaseModel):
    text: str
