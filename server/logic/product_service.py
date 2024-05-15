from fastapi import HTTPException


class ProductService:
    def __init__(self, collection):
        self.collection = collection

    async def get_all_products(self) -> list:
        # TODO: need to think if to return popular items instead of all
        products = self.collection.find({}, {"_id": 0}).limit(20)
        return products

    async def get_products_by_name(self, name) -> list:
        products = self.collection.find({"ItemName": {"$regex": name}}, {"_id": 0})
        if products.count() == 0 or products is None:
            raise HTTPException(status_code=404, detail="Product doesn't exists")
        return products
