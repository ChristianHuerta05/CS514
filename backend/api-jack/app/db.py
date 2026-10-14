import os

from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set; copy .env.example to .env and fill it in")

# Neon suspends idle connections, so test each one before use.
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
