import uuid

from sqlalchemy import func
from sqlalchemy.orm import Session
from . import models
from .models import SavedMenu, UserSavedMenus, User
from ...util.fastapi_types import UserCreate, Menu


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: UserCreate):
    db_user = models.User(
        name=user.name,
        username=user.username,
        email=user.email,
        # TODO: AUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUGGGGGGGGGG
        # TODO: THESE NEED TO BE HASHED!!!!
        password=user.password, # TODO: AUGHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH AUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
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

def get_saved_menus_db(db: Session, user_id: str):
    return db.query(SavedMenu) \
        .join(UserSavedMenus) \
        .join(User) \
        .filter(User.id == user_id) \
        .all()

def save_menu_db(db: Session, save_request_menu: Menu, user_id: int):
    json_menu = save_request_menu.model_dump_json()
    new_menu_id = uuid.uuid4()

    new_menu = SavedMenu(
        id=new_menu_id,
        saved_menu=json_menu,
        timestamp=func.now()

    )
    db.add(new_menu)
    db.flush()
    user_menu_link = UserSavedMenus(
        user_id=user_id,
        menu_id=new_menu.id
    )
    db.add(user_menu_link)

    db.commit()
    db.refresh(new_menu)
    return new_menu_id