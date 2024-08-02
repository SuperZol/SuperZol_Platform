from fastapi import APIRouter, status, Response
from server.logic.user_service import UserService
from server.data.user import User
from server.config.database import user_collection
from typing import Dict

router = APIRouter(prefix='/users')
user_service = UserService(user_collection)


@router.post(
    "/",
    response_description="Creates a user",
    response_model=User,
    response_model_by_alias=False,
    status_code=status.HTTP_201_CREATED
)
async def create_user(user: User):
    return await user_service.create_user(dict(user))


@router.get(
    "/login/{email}/{password}",
    response_description="Login to user",
    response_model=User,
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def user_login(response: Response, email: str, password: str):
    user = await user_service.user_login(email, password)
    response.set_cookie(key="user_token", value=user['email'], httponly=True)
    return user


@router.put(
    "/edit/{email}",
    response_description="Updates user info",
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def update_user(email: str, user_updated_fields: dict):
    await user_service.update_user(email, user_updated_fields)


@router.put(
    "/history/{email}",
    response_description="Updates user history cart",
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def update_cart(email: str, cart: Dict[str, int]):
    await user_service.update_cart(email, cart)
