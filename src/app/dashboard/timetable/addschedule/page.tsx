"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

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

const AddSchedulePage = () => {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("Lecture");
  const [platform, setPlatform] = useState("YouTube");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subject || !startTime || !endTime) {
      return;
    }

    const oldSchedules: Schedule[] = JSON.parse(
      localStorage.getItem("studyhub-schedules") || "[]"
    );

    const newSchedule: Schedule = {
      id: Date.now(),
      subject,
      day,
      startTime,
      endTime,
      type,
      platform,
      color: "border-l-blue-500",
    };

    const updatedSchedules = [...oldSchedules, newSchedule];

    localStorage.setItem(
      "studyhub-schedules",
      JSON.stringify(updatedSchedules)
    );

    router.push("/timetable");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-2xl">
        {/* Back */}
        <Link
          href="/dashboard/timetable"
          className="mb-5 flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to Timetable
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FaCalendarAlt />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Add Schedule
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Add a class or study session to your timetable.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Day */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Day
              </label>

              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {days.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Start Time
                </label>

                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  End Time
                </label>

                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Session Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Lecture</option>
                <option>Practice</option>
                <option>Revision</option>
                <option>Test</option>
                <option>Self Study</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Resource / Platform
              </label>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>YouTube</option>
                <option>Notes</option>
                <option>Book</option>
                <option>Online Class</option>
                <option>Self Study</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard/timetable"
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Add to Timetable
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddSchedulePage;