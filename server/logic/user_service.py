from bson import ObjectId
from fastapi import HTTPException
from email_validator import validate_email
import asyncio
from typing import Dict


class UserService:
    def __init__(self, collection):
        self.collection = collection

    async def create_user(self, user: dict):
        if await self.is_valid_user(user) is False:
            raise HTTPException(status_code=404, detail="Email exists or invalid Password")
        result = self.collection.insert_one(user)
        inserted_id = result.inserted_id
        user['_id'] = str(inserted_id)
        inserted_user = self.collection.find_one({"_id": ObjectId(inserted_id)}, {'_id': 0})
        return inserted_user

    async def user_login(self, email: str, password: str) -> dict:
        user = self.collection.find_one({"email": email, "password": password}, {'_id': 0})
        if user is None:
            raise HTTPException(status_code=404, detail="password / email is not valid")
        return user

    async def update_user(self, email: str, update: dict):
        user = self.collection.find_one({'email': email})
        update_fields = {}
        if not await self.is_password_valid(update['password']):
            raise HTTPException(status_code=404, detail="password is not valid")
        else:
            update_fields['password'] = update['password']
        if user['distance_preference'] != update['distance_preference']:
            update_fields['distance_preference'] = update['distance_preference']
        if update_fields:
            self.collection.update_one({'email': email}, {'$set': update_fields})

    async def update_cart(self, email: str, cart: Dict[str, int]):
        user = self.collection.find_one({'email': email})
        if user is None:
            raise HTTPException(status_code=404, detail="Email not found")
        user['shopping_history'].append(cart)
        self.collection.update_one({'email': email}, {'$set': {'shopping_history': user['shopping_history']}})

    @staticmethod
    async def is_password_valid(password: str) -> bool:
        return len(password) >= 6

    async def is_email_exists(self, email: str) -> bool:
        if not self.is_email_valid(email):
            return False
        document = self.collection.find_one({"email": email})
        return document is None

    async def is_valid_user(self, user: dict) -> bool:
        result = await asyncio.gather(
            self.is_email_exists(user['email']),
            self.is_password_valid(user['password'])
        )
        return all(result)

    @staticmethod
    def is_email_valid(email) -> bool:
        try:
            validate_email(email, check_deliverability=False)
            return True
        except:
            return False
