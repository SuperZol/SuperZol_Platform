from pydantic import BaseModel


class Supermarket(BaseModel):
    store_id: str
    store_name: str
    address: str
    city: str
    zip_code: str
