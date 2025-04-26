from sqlalchemy import Column, Integer, String, JSON
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