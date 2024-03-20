from fastapi import FastAPI
from server.controllers import user_controller


app = FastAPI()

app.include_router(user_controller)