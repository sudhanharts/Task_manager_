import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length < 42) days.push(null);

  return (
    <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl cursor-pointer w-90 min-h-[350px] flex flex-col justify-between transition-transform duration-300 hover:scale-101">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={prevMonth}
          className="bg-white text-black px-3 py-1 rounded-lg text-2xl"
        >
          ‹
        </button>
        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="bg-white text-black px-3 py-1 rounded-lg text-2xl"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-white mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-xs">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-2 flex-grow">
        {days.map((day, index) => {
          const isToday =
            day &&
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <div
              key={index}
              className={`h-6 flex items-center justify-center rounded-xl transition-all ${
                day
                  ? isToday
                    ? "bg-white text-black text-xs font-bold shadow-lg"
                    : "bg-blue-500 text-xs hover:bg-[#3a3a3a]"
                  : "text-transparent"
              }`}
            >
              {day && <span>{day}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
