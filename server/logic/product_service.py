from fastapi import HTTPException
from typing import List

from server.data.base_product import BaseProduct


class ProductService:
    def __init__(self, collection):
        self.collection = collection

    async def get_all_products(self) -> List[BaseProduct]:
        # TODO: need to think if to return popular items instead of all
        pipline = [
            {
                "$group": {
                    "_id": "$ItemCode",
                    "document": {"$first": "$$ROOT"}
                }
            },
            {
                "$replaceRoot": {
                    "newRoot": "$document"
                }
            },
            {
                "$limit": 20
            }
        ]
        products = list(self.collection.aggregate(pipline))
        return products

    async def get_products_by_name(self, name) -> List[BaseProduct]:
        pipline = [
            {
                "$group": {
                    "_id": "$ItemCode",
                    "document": {"$first": "$$ROOT"}
                }
            },
            {
                "$replaceRoot": {
                    "newRoot": "$document"
                }
            },
            {
                "ItemName": {"$regex": name}
            },
            {
                "$limit": 20
            }
        ]
        products = self.collection.find({"ItemName": {"$regex": name}}, {"_id": 0}).limit(20)
        if products is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return products
