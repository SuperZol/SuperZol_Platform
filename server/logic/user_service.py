from data.user_entity import User
from bson import ObjectId
import asyncio
import re
FORMAT_EMAIL_REGEX = r"^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"

class UserService:
    def __init__(self,collection): 
        self.collection = collection    
        
        
    async def create_User(self,user: dict):
        if await self.is_valid_user(user) is False:
            return dict() # TODO: need to check if we need to return empty dict or error 404
        result = self.collection.insert_one(user)
        # After insertion, 'result' contains an InsertOneResult object
        # Retrieve the ObjectId of the inserted document
        inserted_id = result.inserted_id
        user['_id'] = str(inserted_id)
        print(user)
        inserted_user =self.collection.find_one({"_id": ObjectId(inserted_id)}, {'_id': 0})
        return inserted_user

    
    async def is_valid_user(self,user:User) -> bool: 
        result = await asyncio.gather(
            self.check_email_exists(user['email'])
            )
        return all(result) 
        
    async def check_email_exists(self,email: str) -> bool:
        if not self.is_email_valid(email):
            return False  
        
        document = self.collection.find_one({"email": email})
        return document is None    

    def is_email_valid(self,email) -> bool:
        pattern = re.compile(FORMAT_EMAIL_REGEX)
        return bool(pattern.match(email))
        
   