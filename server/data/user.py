from pydantic import BaseModel
from typing import List, Dict


class User(BaseModel):
    email: str
    password: str
    distance_preference: float = 0.0
    shopping_history: List[Dict[str, int]] = []

