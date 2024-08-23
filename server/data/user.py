from pydantic import BaseModel
from typing import List, Dict


class User(BaseModel):
    email: str
    password: str
    distance_preference: float = 5
    shopping_history: List[Dict[str, object]] = []

