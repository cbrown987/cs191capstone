from uuid import uuid4

from sqlalchemy import Column, Integer, String, UUID, ForeignKey, TIMESTAMP, text, JSON
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from .database import AWSDB

class User(AWSDB.Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    about = Column(String)
    saved_recipes = Column(JSON)
    menu_associations = relationship("UserSavedMenus", back_populates="user", cascade="all, delete-orphan")

    @property
    def saved_menus_list(self):
        return [assoc.menu for assoc in self.menu_associations]


class UserSavedMenus(AWSDB.Base):
    __tablename__ = "user_saved_menus"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    menu_id = Column(UUID(as_uuid=True), ForeignKey("saved_menus.id"), primary_key=True)


    user = relationship("User", back_populates="menu_associations")
    menu = relationship("SavedMenu", back_populates="user_associations")


class SavedMenu(AWSDB.Base):
    __tablename__ = "saved_menus"


    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    saved_menu = Column(JSONB)
    timestamp = Column(TIMESTAMP(timezone=True), server_default = text("CURRENT_TIMESTAMP"))
    user_associations = relationship("UserSavedMenus", back_populates="menu")




