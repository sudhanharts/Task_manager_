// src/components/Dailycount/Dailycount.jsx
import React from "react";

const Dailycount = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed === 1).length;
  const pending = total - completed;

  return (
    <div className="flex flex-col justify-evenly">
      <div className="bg-red-500 text-white p-4 rounded-xl w-[200px] shadow-xl transition-transform duration-300 hover:scale-101">
        <p>Total Tasks</p>
        <h2 className="text-2xl">{total}</h2>
      </div>

      <div className="bg-green-500 text-white p-4 rounded-xl w-[200px] shadow-xl transition-transform duration-300 hover:scale-101">
        <p>Completed Tasks</p>
        <h2 className="text-2xl">{completed}</h2>
      </div>

      <div className="bg-yellow-500 text-white p-4 rounded-xl w-[200px] shadow-xl transition-transform duration-300 hover:scale-101">
        <p>Pending Tasks</p>
        <h2 className="text-2xl">{pending}</h2>
      </div>
    </div>
  );
};

export default Dailycount;
