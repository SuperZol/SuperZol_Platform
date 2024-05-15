from pymongo import MongoClient

mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client['SuperZol']
user_collection = db["user_collection"]
product_collection = db["products"]
