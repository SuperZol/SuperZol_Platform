from typing import List, Dict

from bson import ObjectId
from fastapi import HTTPException
from server.data.base_product import BaseProduct
from server.data.product_image import ProductImage


class ProductService:
    def __init__(self, product_collection, product_image_collection):
        self.product_collection = product_collection
        self.product_image_collection = product_image_collection

    async def get_all_products(self, page: int, page_size: int) -> List[BaseProduct]:
        skip = (page - 1) * page_size
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
                "$skip": skip
            },
            {
                "$limit": page_size
            }
        ]
        products = self.product_collection.aggregate(pipeline)
        return products

    async def get_products_by_name(self, name, page: int, page_size: int) -> List[BaseProduct]:
        skip = (page - 1) * page_size
        pipeline = [
            {
                "$match": {"ItemName": {"$regex": name}}
            },
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
                "$skip": skip
            },
            {
                "$limit": page_size
            }
        ]
        products = self.product_collection.aggregate(pipeline)
        if products is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return products

    async def get_product_by_id(self, product_id) -> List[BaseProduct]:
        pipeline = [
            {
                "$match": {"ItemCode": product_id}
            },
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
            }
        ]
        product = self.product_collection.aggregate(pipeline)
        if product is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return product

    async def get_products_by_category(self, category, page: int, page_size: int) -> List[BaseProduct]:
        skip = (page - 1) * page_size
        pipeline = [
            {
                "$match": {"Category": category}
            },
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
                "$skip": skip
            },
            {
                "$limit": page_size
            }
        ]
        product = self.product_collection.aggregate(pipeline)
        if product is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return product

    async def get_products_by_name_and_category(self, name, category, page, page_size) -> List[BaseProduct]:
        skip = (page - 1) * page_size
        pipeline = [
            {
                "$match": {"Category": category, "ItemName": {"$regex": name}}
            },
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
                "$skip": skip
            },
            {
                "$limit": page_size
            }
        ]
        product = self.product_collection.aggregate(pipeline)
        if product is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return product

    async def get_all_products_images(self) -> List[ProductImage]:
        products_images = list(self.product_image_collection.find())
        if products_images is None:
            return []
        return products_images
