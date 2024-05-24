from typing import Optional
from server.data.base_product import BaseProduct


class Product(BaseProduct):
    ItemType: str
    ManufacturerName: Optional[str] = ''
    UnitQty: str
    UnitOfMeasure: Optional[str] = ''
    bIsWeighted: Optional[str] = ''
    QtyInPackage: Optional[str] = ''
    UnitOfMeasurePrice: Optional[str] = ''
    StoreId: str
