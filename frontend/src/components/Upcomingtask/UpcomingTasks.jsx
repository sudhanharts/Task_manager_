import React from "react";
import { CheckCircle, Trash2 } from "lucide-react";

const UpcomingTasks = ({ tasks, onComplete, onDelete }) => {
  const tomorrow = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];

  const list = tasks.filter(
    (t) => t.status === "tomorrow" && t.completed === 0
  );

  return (
    <div className="bg-slate-900 text-white p-5 rounded-xl w-[300px] transition-transform duration-300 hover:scale-101">
      <h2 className="text-lg font-semibold">Upcoming Tasks</h2>

      <div className="mt-3">
        {list.length === 0 ? (
          <p>No upcoming tasks 🚀</p>
        ) : (
          list.map((t) => (
            <div
              key={t.id}
              className="bg-slate-800 p-3 rounded mt-2 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{t.title}</p>
                <p className="text-xs">{t.date}</p>
              </div>

              <div className="flex gap-4">
                {/* COMPLETE BUTTON */}
                <button
                  onClick={() => onComplete(t.id)}
                  className="text-green-500 hover:text-green-700 transition"
                  title="Mark Complete"
                >
                  <CheckCircle size={20} />
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => {
                    if (window.confirm("Delete this task?")) {
                      onDelete(t.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete Task"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;
