// src/components/Taskfillpage/Taskfill.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const TaskFill = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Normal");

  const handleAddTask = () => {
    if (!title || !date || !time) return alert("Fill required fields");

    onSave({
      title,
      description: details,
      date,
      time,
      priority,
      status: "pending",
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-2xl"
    >
      <motion.div className="bg-blue-500 rounded-2xl p-6 w-[90%] sm:w-[400px]">
        <div className="flex justify-between">
          <h2 className="text-white text-xl font-semibold">Add New Task</h2>
          <button className="text-white" onClick={onClose}>✕</button>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <input className="bg-white p-2 rounded" placeholder="Title"
            value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea className="bg-white p-2 rounded h-24" placeholder="Details"
            value={details} onChange={(e) => setDetails(e.target.value)} />

          <div className="flex gap-3">
            <input type="date" className="bg-white p-2 rounded w-full"
              value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" className="bg-white p-2 rounded w-full"
              value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <select className="bg-white p-2 rounded"
            value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>

          <button className="bg-red-600 text-white py-2 mt-3 rounded"
            onClick={handleAddTask}>
            Save Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskFill;
