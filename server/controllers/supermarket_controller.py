from fastapi import APIRouter, status

from server.data.cheapest_supermarkets_request import CheapestSupermarketsRequest
from server.logic.supermarket_service import SupermarketService
from server.config.database import product_collection, supermarket_collection
from typing import List, Dict

router = APIRouter(prefix='/supermarket')
supermarket_service = SupermarketService(product_collection, supermarket_collection)


@router.post('/cheapest_supermarkets',
             response_description="List of supermarkets with the available products",
             response_model=List[Dict],
             response_model_by_alias=False,
             status_code=status.HTTP_200_OK)
async def get_cheapest_supermarkets(request: CheapestSupermarketsRequest):
    stores = await supermarket_service.get_cheapest_supermarkets(request)
    return stores
