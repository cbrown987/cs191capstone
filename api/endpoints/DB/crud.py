from sqlalchemy.orm import Session
from . import models
from ...util.fastapi_types import UserCreate


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: UserCreate):
    db_user = models.User(
        name=user.name,
        username=user.username,
        email=user.email,
        password=user.password,  # Note: In production, hash the password!
        about=user.about,
        saved_recipes=user.saved_recipes
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def save_recipe(db: Session, username: str, recipe_name: str, recipe_id: str, recipe_type: str):
    user = get_user_by_username(db, username)
    if not user:
        return None

    prefix = "C" if recipe_type == "drink" or recipe_type == "drinks" else "M"
    full_id = f"{prefix}{recipe_id}"

    if user.saved_recipes is None:
        user.saved_recipes = []

    new_recipe = {recipe_name: full_id}
    user.saved_recipes.append(new_recipe)

    db.commit()
    db.refresh(user)
    return user