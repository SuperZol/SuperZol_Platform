from pydantic import BaseModel
from typing import Optional


class Product(BaseModel):
    ItemCode: str
    ItemType: str
    ItemName: str
    ManufacturerName: Optional[str] = ''
    UnitQty: str
    Quantity: str
    UnitOfMeasure: Optional[str] = ''
    bIsWeighted: Optional[str] = ''
    QtyInPackage: Optional[str] = ''
    ItemPrice: str
    UnitOfMeasurePrice: Optional[str] = ''
    StoreId: str
