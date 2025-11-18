import database

def get_all_tasks():
    conn = database.get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM tasks ORDER BY date, time")
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def create_task(title, description, date, time, priority, status):
    conn = database.get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO tasks (title, description, date, time, priority, completed, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (title, description, date, time, priority, 0, status or "pending"))

    conn.commit()
    task_id = cur.lastrowid
    conn.close()
    return task_id


def update_task(task_id, task_data: dict):
    conn = database.get_connection()
    cur = conn.cursor()

    fields = ", ".join([f"{k}=?" for k in task_data])
    values = list(task_data.values()) + [task_id]

    cur.execute(f"UPDATE tasks SET {fields} WHERE id=?", values)
    conn.commit()
    updated = cur.rowcount
    conn.close()
    return updated > 0


def delete_task(task_id):
    conn = database.get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM tasks WHERE id=?", (task_id,))
    conn.commit()
    deleted = cur.rowcount
    conn.close()
    return deleted > 0
