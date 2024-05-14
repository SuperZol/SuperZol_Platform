from fastapi import FastAPI
from server.controllers import user_controller, product_controller

app = FastAPI()

app.include_router(user_controller.router)
app.include_router(product_controller.router)
