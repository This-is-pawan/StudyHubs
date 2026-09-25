"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaPlus,
  FaClock,
  FaYoutube,
  FaBookOpen,
  FaTrash,
} from "react-icons/fa";

interface Schedule {
  id: number;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
  type: string;
  platform: string;
  color: string;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultSchedules: Schedule[] = [
  {
    id: 1,
    subject: "Mathematics",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    type: "Lecture",
    platform: "YouTube",
    color: "border-l-blue-500",
  },
  {
    id: 2,
    subject: "Reasoning",
    day: "Monday",
    startTime: "10:30",
    endTime: "11:30",
    type: "Practice",
    platform: "Self Study",
    color: "border-l-red-500",
  },
  {
    id: 3,
    subject: "English",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "10:00",
    type: "Lecture",
    platform: "YouTube",
    color: "border-l-green-500",
  },
  {
    id: 4,
    subject: "Computer",
    day: "Wednesday",
    startTime: "11:00",
    endTime: "12:00",
    type: "Practice",
    platform: "Notes",
    color: "border-l-purple-500",
  },
];

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const date = new Date();

  date.setHours(Number(hour));
  date.setMinutes(Number(minute));

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const TimetablePage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    setSelectedDay(today);

    const savedSchedules = localStorage.getItem("studyhub-schedules");

    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    } else {
      setSchedules(defaultSchedules);
      localStorage.setItem(
        "studyhub-schedules",
        JSON.stringify(defaultSchedules)
      );
    }
  }, []);

  const deleteSchedule = (id: number) => {
    const updatedSchedules = schedules.filter(
      (schedule) => schedule.id !== id
    );

    setSchedules(updatedSchedules);

    localStorage.setItem(
      "studyhub-schedules",
      JSON.stringify(updatedSchedules)
    );
  };

  const selectedSchedules = schedules
    .filter((schedule) => schedule.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Timetable
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Plan your classes and study sessions.
            </p>
          </div>

          <Link
            href="/dashboard/timetable/addschedule"
            className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus />
            Add Schedule
          </Link>
        </div>

        {/* Days */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedDay === day
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Schedule */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {selectedDay}
              </h2>

              <p className="text-sm text-slate-500">
                {selectedSchedules.length} scheduled{" "}
                {selectedSchedules.length === 1 ? "session" : "sessions"}
              </p>
            </div>
          </div>

          {selectedSchedules.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600">
                <FaBookOpen />
              </div>

              <h3 className="font-semibold text-slate-800">
                Nothing scheduled
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                You don't have any study sessions planned for {selectedDay}.
              </p>

              <Link
                href="/dashboard/timetable/addschedule"
                className="mt-4 text-sm font-medium text-blue-600 hover:underline"
              >
                + Add your first schedule
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedSchedules.map((item) => (
                <article
                  key={item.id}
                  className={`group border-l-4 ${item.color} rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md`}
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex gap-4">
                      {/* Time */}
                      <div className="min-w-24">
                        <p className="font-semibold text-slate-800">
                          {formatTime(item.startTime)}
                        </p>

                        <p className="text-xs text-slate-400">
                          {formatTime(item.endTime)}
                        </p>
                      </div>

                      {/* Subject */}
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {item.subject}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <FaClock className="text-xs" />
                            {item.type}
                          </span>

                          <span className="flex items-center gap-1.5">
                            {item.platform === "YouTube" ? (
                              <FaYoutube className="text-red-500" />
                            ) : (
                              <FaBookOpen className="text-blue-500" />
                            )}

                            {item.platform}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => deleteSchedule(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete schedule"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default TimetablePage;