"use client";

import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}

const ProgressPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("studyhub-tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Group tasks by subject
  const subjectProgress = tasks.reduce<
    Record<string, { total: number; completed: number }>
  >((acc, task) => {
    const subject = task.subject || "General";

    if (!acc[subject]) {
      acc[subject] = {
        total: 0,
        completed: 0,
      };
    }

    acc[subject].total += 1;

    if (task.completed) {
      acc[subject].completed += 1;
    }

    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Progress
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            See how much work you have completed.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaTasks />
            </div>

            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              {totalTasks}
            </h2>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FaCheckCircle />
            </div>

            <p className="text-sm text-slate-500">
              Completed
            </p>

            <h2 className="mt-1 text-2xl font-bold text-green-600">
              {completedTasks}
            </h2>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FaClock />
            </div>

            <p className="text-sm text-slate-500">
              Pending
            </p>

            <h2 className="mt-1 text-2xl font-bold text-orange-500">
              {pendingTasks}
            </h2>
          </div>

          {/* Completion */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FaChartLine />
            </div>

            <p className="text-sm text-slate-500">
              Completion
            </p>

            <h2 className="mt-1 text-2xl font-bold text-purple-600">
              {progress}%
            </h2>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                Overall Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Based on your completed tasks.
              </p>
            </div>

            <span className="text-lg font-bold text-blue-600">
              {progress}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>
              {completedTasks} completed
            </span>

            <span>
              {pendingTasks} remaining
            </span>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Subject Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your progress across different subjects.
            </p>
          </div>

          {Object.keys(subjectProgress).length === 0 ? (
            <div className="py-16 text-center">
              <FaBookOpen className="mx-auto mb-4 text-4xl text-blue-200" />

              <h3 className="font-semibold text-slate-700">
                No progress yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add tasks to start tracking your progress.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(subjectProgress).map(
                ([subject, data]) => {
                  const percentage = Math.round(
                    (data.completed / data.total) * 100
                  );

                  return (
                    <div key={subject}>
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-700">
                            {subject}
                          </h3>

                          <p className="text-xs text-slate-400">
                            {data.completed} of {data.total} tasks
                          </p>
                        </div>

                        <span className="text-sm font-semibold text-slate-600">
                          {percentage}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProgressPage;