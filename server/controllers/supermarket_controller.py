from fastapi import APIRouter, status
from server.logic.supermarket_service import AlgorithmService
from server.config.database import product_collection, supermarket_collection
from typing import List, Dict

router = APIRouter(prefix='/algorithm')
algorithm_service = AlgorithmService(product_collection, supermarket_collection)


@router.post('/cheapest_supermarkets',
             response_description="List of supermarkets with the available products",
             response_model=List[dict],
             response_model_by_alias=False,
             status_code=status.HTTP_200_OK)
async def get_cheapest_supermarkets(shopping_list: Dict[str, int], lat: float, lng: float, distance_preference: float):
    stores = await algorithm_service.get_cheapest_supermarkets(
        shopping_list, lat, lng, distance_preference)
    return stores
