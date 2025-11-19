// src/components/Homepage/Homepage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../Navbar/Navbar";
import TaskFill from "../Taskfillpage/Taskfill";
import Dailytask from "../Dailytask/Dailytask";
import Calender from "../Calendar/calendar";
import Dailycount from "../Dailycount/Dailycount";
import Quote from "../Quote/Quote";
import UpcomingTasks from "../Upcomingtask/UpcomingTasks";

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://task-manager-ehbt.onrender.com/tasks");
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("FAILED TO LOAD TASKS:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Save new task
  const handleSaveTask = async (newTask) => {
    try {
      await axios.post("https://task-manager-ehbt.onrender.com/tasks", newTask);
      await fetchTasks();
      setShowOverlay(false);
    } catch (error) {
      console.error("FAILED TO SAVE:", error);
    }
  };

  // Mark Complete
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`https://task-manager-ehbt.onrender.com/tasks/${id}`, {
        completed: 1,
        status: "completed",
      });
      await fetchTasks();
    } catch (error) {
      console.error("FAILED TO COMPLETE:", error);
    }
  };

  // Move to Tomorrow
  const handleAddToTomorrow = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const dt = new Date(task.date);
      dt.setDate(dt.getDate() + 1);
      const newDate = dt.toISOString().split("T")[0];

      await axios.put(`https://task-manager-ehbt.onrender.com/tasks/${id}`, {
        date: newDate,
        status: "tomorrow",
      });

      await fetchTasks();
    } catch (error) {
      console.error("FAILED TO MOVE:", error);
    }
  };

  // Delete
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://task-manager-ehbt.onrender.com/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error("FAILED TO DELETE:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <Navbar tasks={tasks} onAddTask={() => setShowOverlay(true)} onCompleteTask={handleCompleteTask} />

      {showOverlay && (
        <TaskFill onSave={handleSaveTask} onClose={() => setShowOverlay(false)} />
      )}

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex flex-wrap justify-center-safe gap-4">
          <Calender />
          <Dailycount tasks={tasks} />
          <Quote />
        </div>

        <div className="flex flex-wrap justify-center gap-25">
          <Dailytask
            tasks={tasks}
            onComplete={handleCompleteTask}
            onTomorrow={handleAddToTomorrow}
            onDelete={handleDeleteTask}
          />
<UpcomingTasks 
    tasks={tasks} 
    onComplete={handleCompleteTask} 
    onDelete={handleDeleteTask} 
/>
        </div>
      </div>
    </div>
  );
};

export default Home;
