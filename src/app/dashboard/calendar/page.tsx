"use client";

import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const today = new Date();

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthName =
    currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-slate-900">
            Calendar
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your study schedule and important dates.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

          {/* Calendar Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FaCalendarAlt />
              </div>

              <h2 className="text-xl font-semibold text-slate-800">
                {monthName}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToday}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Today
              </button>

              <button
                onClick={previousMonth}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Week Names */}
          <div className="grid grid-cols-7 border-b border-slate-200">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold uppercase text-slate-400 sm:text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className="min-h-20 border-b border-r border-slate-100 p-2 sm:min-h-28"
              >
                {day && (
                  <button
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
                      isToday(day)
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CalendarPage;