from fastapi import APIRouter, status
from logic.user_service import UserService
from data.user_entity import User
from config.database import user_collection

router = APIRouter(prefix='/users')
user_service = UserService(user_collection)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def createUser(user: User):
    return await user_service.create_user(dict(user))


@router.get("/login/{email}/{password}", status_code=status.HTTP_200_OK)
async def loginUser(email: str, password: str):
    return await user_service.login(email, password)


@router.put("/edit/{email}", status_code=status.HTTP_200_OK)
async def updateUser(email: str, user: User):
    await user_service.update_user(email, dict(user))
