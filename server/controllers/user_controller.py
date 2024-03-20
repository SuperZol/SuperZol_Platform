from fastapi import APIRouter
from logic.user_service import UserService
from data.user_entity import User
from mongodb_config import user_collection

router = APIRouter(prefix='/users')
user_service = UserService(user_collection)


@router.post("/")
async def createUser(user:User):
    return await user_service.create_user(dict(user))
    