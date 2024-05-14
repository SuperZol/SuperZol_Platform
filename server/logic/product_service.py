from fastapi import HTTPException


class ProductService:
    def __init__(self, collection):
        self.collection = collection

    async def get_all_products(self):
        products = self.collection.find({}, {"_id": 0})
        return products

    async def get_products_by_name(self, name):
        products = self.collection.find({"ItemName": {"$regex": name}}, {"_id": 0})
        if products.count() == 0 or products is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return products
