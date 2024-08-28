import uuid

from bson import ObjectId
from fastapi import HTTPException
from email_validator import validate_email
from typing import Dict
import datetime


class UserService:
    def __init__(self, collection):
        self.collection = collection

    async def create_user(self, user: dict):
        if await self.is_valid_user(user) is False:
            raise HTTPException(status_code=404, detail="האימייל כבר בשימוש או אינו תקין")
        result = self.collection.insert_one(user)
        inserted_id = result.inserted_id
        user['_id'] = str(inserted_id)
        inserted_user = self.collection.find_one({"_id": ObjectId(inserted_id)}, {'_id': 0})
        return inserted_user

    async def user_login(self, email: str, password: str) -> dict:
        user = self.collection.find_one({"email": email, "password": password}, {'_id': 0})
        if user is None:
            raise HTTPException(status_code=401, detail="סיסמה או אימייל אינו תקין")
        return user

    async def update_user(self, email: str, update: dict):
        if 'email' in update:
            if await self.is_email_not_valid_or_exists(update['email']) is False:
                raise HTTPException(status_code=404, detail="האימייל קיים במערכת או אינו תקין")
        self.collection.update_one({'email': email}, {'$set': update})

    async def update_shopping_history(self, email: str, cart: Dict[str, object]):
        user = self.collection.find_one({'email': email})
        if user is None:
            raise HTTPException(status_code=404, detail="האימייל לא קיים")
        user['shopping_history'].append(cart)
        self.collection.update_one({'email': email}, {'$set': {'shopping_history': user['shopping_history']}})

    @staticmethod
    async def is_password_valid(password: str) -> bool:
        return len(password) >= 6

    async def is_email_not_valid_or_exists(self, email: str) -> bool:
        if not self.is_email_valid(email):
            return False
        document = self.collection.find_one({"email": email})
        return document is None

    async def is_valid_user(self, user: dict) -> bool:
        return await self.is_email_not_valid_or_exists(user['email'])

    @staticmethod
    def is_email_valid(email) -> bool:
        try:
            validate_email(email, check_deliverability=False)
            return True
        except:
            return False

    async def find_user_by_email(self, email: str) -> dict:
        return self.collection.find_one({"email": email}, {'_id': 0})

    async def save_reset_token(self, email: str):
        reset_token = str(uuid.uuid4())
        self.collection.update_one(
            {"email": email},
            {"$set": {"reset_token": reset_token,
                      "reset_token_expiry": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}}
        )
        return reset_token

    async def verify_reset_token(self, token: str) -> str:
        user = self.collection.find_one({"reset_token": token})
        if not user:
            raise HTTPException(status_code=404, detail="יוזר לא נמצא או תוקן לא חוקי")

        if user["reset_token_expiry"] <= datetime.datetime.utcnow():
            raise HTTPException(status_code=400, detail="התוקן פג תוקף")

        return user["email"]

    async def update_password(self, email: str, new_password: str):
        if not await self.is_password_valid(new_password):
            raise HTTPException(status_code=400, detail="סיסמה לא תקינה")
        self.collection.update_one({"email": email}, {
            "$set": {"password": new_password, "reset_token": None, "reset_token_expiry": None}})
