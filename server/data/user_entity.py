from pydantic import BaseModel
class User(BaseModel):
    email: str
    password : str
    lat : float = 0.0
    lng : float = 0.0
    distance_preference : float =0.0
    shopping_history : list = [[]] 
