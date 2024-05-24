from fastapi import APIRouter, status
from server.logic.algorithm_service import AlgorithmService
from server.data.user import User
from server.config.database import product_collection, user_collection, supermarket_collection
from typing import List
from server.data.base_product import BaseProduct

router = APIRouter(prefix='/algorithm')
algorithm_service = AlgorithmService(product_collection, user_collection, supermarket_collection)


@router.post('/cheapest_supermarkets',
             response_description="List of supermarkets with the available products",
             response_model=List[dict],
             response_model_by_alias=False,
             status_code=status.HTTP_200_OK)
async def get_cheapest_supermarkets(shopping_list: List[BaseProduct], user: User):
    return algorithm_service.find_cheapest_supermarkets(
        shopping_list, dict(user))
