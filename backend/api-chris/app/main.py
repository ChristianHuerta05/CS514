from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import text
from app.db import engine
import bcrypt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/auth/db_test")
def health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "healthy"}

@app.get("/")
def home():
    return {"message": "Hello!!!"}

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

@app.post("/auth/signup")
def signup(request: SignupRequest):
    password_hash = bcrypt.hashpw(request.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    with engine.begin() as conn:
        exists = conn.execute(text("SELECT id FROM users WHERE email = :email"), {"email": request.email}).fetchone()
        if exists:
            raise HTTPException(status_code=409, detail="Email already in")
        
        response = conn.execute(
            text("INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash) RETURNING id, name, email, created_at"),
            {"name": request.name,"email": request.email,"password_hash": password_hash}
        )
        new_user_info = response.fetchone()

    return JSONResponse(
        status_code=201,
        content={
            "id": new_user_info.id,
            "name": new_user_info.name,
            "email": new_user_info.email,
            "created_at": str(new_user_info.created_at),
        },
    )

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
def login(request: LoginRequest):
    with engine.connect() as conn:
        row = conn.execute(
            text("SELECT id, name, email, password_hash, created_at FROM users WHERE email = :email"),
            {"email": request.email},
        ).fetchone()

    if row is None or not bcrypt.checkpw(request.password.encode("utf-8"), row.password_hash.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Wrong email or password")

    return {
        "id": row.id,
        "name": row.name,
        "email": row.email,
        "created_at": str(row.created_at),
    }