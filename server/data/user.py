from pydantic import BaseModel
from server.data.product import Product
from typing import List


class User(BaseModel):
    email: str
    password: str
    lat: float = 0.0
    lng: float = 0.0
    distance_preference: str
    shopping_history: List[List[Product]] = []
