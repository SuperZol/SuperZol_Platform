from pydantic import BaseModel


class BaseProduct(BaseModel):
    ItemCode: str
    ItemName: str
    ItemPrice: str
    Quantity: str
