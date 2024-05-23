from fastapi import FastAPI
from server.controllers import user_controller, product_controller, algorithm_controller
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_controller.router)
app.include_router(product_controller.router)
app.include_router(algorithm_controller.router)
