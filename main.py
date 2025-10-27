from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB (Kubernetes service name)
client = MongoClient("mongodb://mongo-service:27017/")
db = client["testdb"]

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + MongoDB on GKE!"}
