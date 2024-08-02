from typing import List
from fastapi import APIRouter, status, Query
from server.data.base_product import BaseProduct
from server.logic.product_service import ProductService
from server.config.database import product_collection

router = APIRouter(prefix='/product')
product_service = ProductService(product_collection)


@router.get(
    '/products',
    response_description="List of products",
    response_model=List[BaseProduct],
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_all_products(
        page: int = Query(1, ge=1),
        page_size: int = Query(10, ge=1, le=100)
):
    return await product_service.get_all_products(page=page, page_size=page_size)


@router.get(
    '/name/{name}',
    response_description="List of products by name",
    response_model=List[BaseProduct],
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_products_by_name(
        name: str,
        page: int = Query(1, ge=1),
        page_size: int = Query(10, ge=1, le=100)
):
    return await product_service.get_products_by_name(name=name, page=page, page_size=page_size)


@router.get(
    '/id/{product_id}',
    response_description="A product by id",
    response_model=List[BaseProduct],
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_product_by_id(product_id: str):
    return await product_service.get_product_by_id(product_id=product_id)


@router.get(
    '/category/{category}',
    response_description="products by category",
    response_model=List[BaseProduct],
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_products_by_category(
        category: str,
        page: int = Query(1, ge=1),
        page_size: int = Query(10, ge=1, le=100)
):
    return await product_service.get_products_by_category(category=category, page=page, page_size=page_size)


@router.get(
    '/nameAndCategory',
    response_description="products by name and category",
    response_model=List[BaseProduct],
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def get_products_by_name_and_category(
        name: str,
        category: str,
        page: int = Query(1, ge=1),
        page_size: int = Query(10, ge=1, le=100)
):
    return await product_service.get_products_by_name_and_category(name=name, category=category, page=page,
                                                                   page_size=page_size)
