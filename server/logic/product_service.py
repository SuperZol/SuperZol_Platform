from typing import List
from fastapi import HTTPException
from server.data.base_product import BaseProduct


class ProductService:
    def __init__(self, collection):
        self.collection = collection

    async def get_all_products(self) -> List[BaseProduct]:
        # TODO: need to think if to return popular items instead of all
        pipeline = [
            {
                "$match": {
                    "$expr": {
                        "$gt": [
                            {"$toDouble": "$ItemPrice"},
                            0
                        ]
                    }
                }
            },
            {
                "$group": {
                    "_id": "$ItemCode",
                    "document": {"$first": "$$ROOT"},
                    "MinPrice": {"$min": "$ItemPrice"},
                    "MaxPrice": {"$max": "$ItemPrice"}
                }
            },
            {
                "$addFields": {
                    "document.MinPrice": "$MinPrice",
                    "document.MaxPrice": "$MaxPrice"
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
        products = self.collection.aggregate(pipeline)
        return products

    async def get_products_by_name(self, name) -> List[BaseProduct]:
        pipeline = [
            {
                "$match": {
                    "$expr": {
                        "$gt": [
                            {"$toDouble": "$ItemPrice"},
                            0
                        ]
                    }
                }
            },
            {
                "$group": {
                    "_id": "$ItemCode",
                    "document": {"$first": "$$ROOT"},
                    "MinPrice": {"$min": "$ItemPrice"},
                    "MaxPrice": {"$max": "$ItemPrice"}
                }
            },
            {
                "$addFields": {
                    "document.MinPrice": "$MinPrice",
                    "document.MaxPrice": "$MaxPrice"
                }
            },
            {
                "$replaceRoot": {
                    "newRoot": "$document"
                }
            },
            {
                "$match": {"ItemName": {"$regex": name}}
            },
            {
                "$limit": 20
            }
        ]
        products = self.collection.aggregate(pipeline)
        if products is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return products
