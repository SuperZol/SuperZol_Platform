from fastapi import APIRouter, status
from server.logic.product_service import ProductService
from server.config.database import product_collection
from server.data.product import Product

router = APIRouter(prefix='/product')
product_service = ProductService(product_collection)


@router.get(
    '/products',
    response_description="List of products",
    response_model=Product,
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_products():
    return await product_service.get_all_products()


@router.get(
    '/{name}',
    response_description="List of products by name",
    response_model=Product,
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_products_by_name(name: str):
    return await product_service.get_products_by_name(name=name)
