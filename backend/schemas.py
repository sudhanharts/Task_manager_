# backend/schemas.py
from typing import Optional
from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: str              # "2025-11-14"
    time: str              # "17:30"
    priority: str = "Normal"
    status: str = "pending"
    completed: int = 0


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    completed: Optional[int] = None
