// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const Navbar = ({ tasks, onAddTask, onCompleteTask }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const tomorrow = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];

  const notifications = tasks.filter(
    (t) =>
      t.status === "tomorrow" &&
      t.completed === 0 &&
      (t.priority === "Low" || t.priority === "Normal") &&
      t.date === tomorrow
  );

  return (
    <nav className="flex justify-evenly items-center sticky px-8 py-4 bg-white">
      <h1 className="text-3xl font-bold">
        <span className="text-blue-600">Task</span>{" "}
        <span className="text-red-600">Manager</span>
      </h1>

      <ul className="flex items-center space-x-8">
        {/* Notification */}
        <li className="relative cursor-pointer" onClick={() => setShowOverlay(!showOverlay)}>
          <Bell className="w-6 h-6 hover:text-emerald-700" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
              {notifications.length}
            </span>
          )}
        </li>

        {/* Add Task */}
        <li>
          <button
            onClick={onAddTask}
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
          >
            Task
          </button>
        </li>
      </ul>

      {showOverlay && (
        <div className="absolute right-1 top-16 bg-white shadow-xl border border-gray-200 w-80 rounded-lg p-0 z-50 overflow-hidden">
          <div className="bg-emerald-600 text-white text-center py-2 font-semibold">
            Notifications
          </div>

          <div className="p-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">No notifications 🎉</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((task) => (
                  <li
                    key={task.id}
                    className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100"
                  >
                    <p className="font-semibold text-gray-800">{task.title}</p>

                    <p className="text-xs text-gray-600">Due: {task.date}</p>

                    <button
                      onClick={() => onCompleteTask(task.id)}
                      className="bg-green-600 text-white text-xs px-3 py-1 rounded-lg mt-2 hover:bg-green-700"
                    >
                      Mark Complete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
