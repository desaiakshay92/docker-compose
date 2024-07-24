from fastapi import APIRouter, Request, Depends
from app.models.user import User
from app.services.user_service import UserService
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@router.post("/submit")
async def submit_name(user: User, user_service: UserService = Depends(UserService)):
    user_service.create_user(user)
    return {"message": user.name}
