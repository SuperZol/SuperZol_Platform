from pydantic import BaseModel


class Product(BaseModel):
    PriceUpdateDate: str
    ItemCode: str
    ItemType: str
    ItemName: str
    ManufacturerName: str
    ManufactureCountry: str
    ManufacturerItemDescription: str
    UnitQty: str
    Quantity: str
    UnitOfMeasure: str
    bIsWeighted: str
    QtyInPackage: str
    ItemPrice: str
    UnitOfMeasurePrice: str
    AllowDiscount: str
    ItemStatus: str
    ItemId: str
    StoreId: str
