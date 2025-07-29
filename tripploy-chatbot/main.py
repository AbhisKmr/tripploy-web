from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

@app.get("/chat")
def read_root():
    return {"message": "Hello from Python Chatbot!"}