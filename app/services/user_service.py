from pymongo import MongoClient
from app.config import settings
from app.models.user import User

class UserService:
    def __init__(self):
        self.client = MongoClient(settings.MONGO_URL)
        self.db = self.client[settings.DATABASE_NAME]
        self.collection = self.db["users"]

    def create_user(self, user: User):
        self.collection.insert_one(user.dict())
