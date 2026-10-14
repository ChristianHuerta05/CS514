from flask import Flask, jsonify
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db import engine

app = Flask(__name__)


@app.get("/db_test")
def db_test():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        return jsonify(error=f"database unreachable: {exc.__class__.__name__}"), 500
    return jsonify(status="ok")
