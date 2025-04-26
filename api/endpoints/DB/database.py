import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from api.config import Config

class AWSDB:
    def __init__(self):
        self.engine = create_engine(
            Config.DATABASE_URL,
            connect_args={"sslmode": "require"}
        )
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()
        self.metadata = MetaData()

AWSDB = AWSDB()

def get_db():
    db = AWSDB.SessionLocal()
    try:
        yield db
    finally:
        db.close()

