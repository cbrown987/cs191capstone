from typing import List, Optional, Dict
from pydantic import BaseModel


class _MenuItem(BaseModel):
    name: str
    id: str
    category: str
    description: str


class Menu(BaseModel):
    food: List[_MenuItem]
    drinks: List[_MenuItem]
    timestamp: str | None = None
    name: str | None = None


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

# AWS schemas

class UserBase(BaseModel):
    username: str
    email: str
    name: Optional[str] = None
    about: Optional[str] = None

class UserCreate(UserBase):
    password: str
    saved_recipes: List[Dict] = []

class User(UserBase):
    id: int
    saved_recipes: List[Dict] = []

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class SaveRecipeRequest(BaseModel):
    username: str
    recipeName: str
    recipeId: str
    recipeType: str

class SaveMenuRequest(BaseModel):
    user_id: int
    menu: Menu
    name: str | None = None

