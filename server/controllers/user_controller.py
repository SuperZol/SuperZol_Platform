from fastapi import APIRouter
from server.logic.user_service import UserService


router = APIRouter(prefix='/users')
drone_service = UserService()
