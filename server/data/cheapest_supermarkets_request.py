from pydantic import BaseModel
from typing import Dict


class ShoppingListRequest(BaseModel):
    shopping_list: Dict[str, int]
    lat: float
    lng: float
    distance_preference: float
