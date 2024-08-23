from fastapi import APIRouter, status, Response, BackgroundTasks, HTTPException
from server.logic.email_service import EmailSender
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
    response_description="Updates user shopping history",
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def update_shopping_history(email: str, cart: Dict[str, object]):
    await user_service.update_shopping_history(email, cart)


@router.post(
    "/forgot-password/{email}",
    response_description="Request password reset",
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK
)
async def forgot_password(email: str, background_tasks: BackgroundTasks):
    user = await user_service.find_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="המייל שהוזן לא קיים במערכת")
    token = await user_service.save_reset_token(email)
    email_sender = EmailSender()
    background_tasks.add_task(email_sender.send_reset_email, email, token)
    return "קישור לאיפוס סיסמה נשלח במייל"


@router.post(
    "/reset-password",
    response_description="Reset password",
    status_code=status.HTTP_200_OK
)
async def reset_password(token: str, new_password: str):
    email = await user_service.verify_reset_token(token)
    await user_service.update_password(email, new_password)
    return "סיסמה אופסה בהצלחה!"
