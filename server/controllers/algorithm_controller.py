from fastapi import APIRouter, status
from server.logic.algorithm_service import AlgorithmService
from server.data.user import User
from server.config.database import product_collection, user_collection,supermarket_collection
from typing import List
from server.data.product import Product

router = APIRouter(prefix='/algorithm')
algorithm_service = AlgorithmService(product_collection, user_collection,supermarket_collection)


@router.post('/cheapest_supermarkets')
async def get_cheapest_supermarkets(shopping_list: List[Product], user: User):
    return algorithm_service.find_cheapest_supermarkets(
        shopping_list, dict(user))
