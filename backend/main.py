from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import crud
import database
from schemas import TaskCreate, TaskUpdate

database.init_db()

app = FastAPI(title="Todo App Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://task-manager-2y28.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tasks")
def get_tasks():
    return crud.get_all_tasks()

@app.post("/tasks")
def create_task(task: TaskCreate):
    task_id = crud.create_task(
        task.title,
        task.description,
        task.date,
        task.time,
        task.priority,
        task.status
    )
    return {"message": "Task created", "task_id": task_id}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: TaskUpdate):
    task_data = task.dict(exclude_unset=True)
    updated = crud.update_task(task_id, task_data)
    if not updated:
        raise HTTPException(404, "Task not found")
    return {"message": "Task updated"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    deleted = crud.delete_task(task_id)
    if not deleted:
        raise HTTPException(404, "Task not found")
    return {"message": "Task deleted"}
