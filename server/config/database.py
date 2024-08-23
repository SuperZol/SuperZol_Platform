import os
from pymongo import MongoClient
from dotenv import load_dotenv

current_dir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(current_dir, '../.env'))
mongo_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongo_uri)

db_name = os.getenv("MONGODB_DATABASE")
db = client[db_name]
user_collection = db[os.getenv("MONGODB_USER_COLLECTION")]
product_collection = db[os.getenv("MONGODB_PRODUCTS_COLLECTION")]
product_image_collection = db[os.getenv("MONGODB_PRODUCTS_IMAGES_COLLECTION")]
supermarket_collection = db[os.getenv("MONGODB_SUPER_MARKETS_COLLECTION")]
