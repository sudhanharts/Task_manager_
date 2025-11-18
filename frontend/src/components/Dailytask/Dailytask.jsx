// src/components/Dailytask/Dailytask.jsx
import React from "react";
import { CheckCircle, Trash2, ArrowRightCircle } from "lucide-react";

const Dailytask = ({ tasks, onComplete, onTomorrow, onDelete }) => {
  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date).toISOString().split("T")[0];

    return (
      taskDate === today &&
      task.completed === 0 &&
      (task.priority === "Normal" || task.priority === "Low") &&
      task.status !== "tomorrow"
    );
  });

  return (
    <div className="bg-cyan-500 px-6 py-5 rounded-2xl w-full lg:w-[47%] shadow-xl transition-transform duration-300 hover:scale-101">
      <h1 className="text-white text-3xl mb-4">Today Task</h1>

      {todayTasks.length === 0 ? (
        <p className="text-gray-200">No tasks today</p>
      ) : (
        <div className="flex flex-col gap-4">
          {todayTasks.map((task) => (
            <div
              key={task.id}
              className="bg-cyan-500 rounded-2xl p-4 flex justify-between items-center"
            >
              <div className="flex-1">
                <h2 className="text-white text-xl font-bold">{task.title}</h2>
                <p className="text-white text-sm">{task.description}</p>
                <p className="text-gray-800 text-xs mt-1">
                  {task.time} | {task.date}
                </p>
              </div>

              <div className="flex gap-6">
                <button
                  onClick={() => onComplete(task.id)}
                  className="text-green-700 hover:text-green-900"
                >
                  <CheckCircle size={22} />
                </button>

                <button
                  onClick={() => onTomorrow(task.id)}
                  className="text-blue-700 hover:text-blue-900"
                >
                  <ArrowRightCircle size={22} />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${task.title}" ?`))
                      onDelete(task.id);
                  }}
                  className="text-red-700 hover:text-red-900"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dailytask;
