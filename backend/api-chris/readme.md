1. Create a virtual environment

python -m venv .venv

Activate it:

Mac/Linux: `source .venv/bin/activate`
Windows: `.venv\Scripts\activate`

2. Install dependencies

pip install -r requirements.txt

3. Set up your `.env` based on the .env.example

4. Run the server

uvicorn app.main:app --reload

swagger API doc: http://localhost:8000/docs
