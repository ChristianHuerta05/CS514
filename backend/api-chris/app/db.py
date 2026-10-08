import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

url = os.getenv("DATABASE_URL")
engine = create_engine(url, pool_pre_ping=True)