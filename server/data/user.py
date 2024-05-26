from pydantic import BaseModel
from typing import List, Dict


class User(BaseModel):
    email: str
    password: str
    lat: float = 0.0
    lng: float = 0.0
    distance_preference: str
    shopping_history: List[Dict[str, int]] = []

