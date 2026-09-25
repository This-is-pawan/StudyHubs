"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCheck,
  FaCalendarAlt,
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

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] =
    useState<Task["priority"]>("Medium");

  const [filter, setFilter] = useState<
    "All" | "Pending" | "Completed"
  >("All");

  // Load tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("studyhub-tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks
  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);

    localStorage.setItem(
      "studyhub-tasks",
      JSON.stringify(updatedTasks)
    );
  };

  // Add task
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "General",
      dueDate,
      priority,
      completed: false,
    };

    saveTasks([newTask, ...tasks]);

    setTitle("");
    setSubject("");
    setDueDate("");
    setPriority("Medium");
  };

  // Complete / uncomplete
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    saveTasks(updatedTasks);
  };

  // Delete
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    saveTasks(updatedTasks);
  };

  // Filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;

    if (filter === "Completed") return task.completed;

    return true;
  });

  const pendingCount = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const priorityStyle = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-700",
    Low: "bg-green-50 text-green-600",
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of assignments, study goals and deadlines.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <h2 className="mt-1 text-2xl font-bold text-blue-600">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <h2 className="mt-1 text-2xl font-bold text-green-600">
              {completedCount}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">

          {/* Add Task */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Add New Task
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                What do you need to study?
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Task */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Task
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. Complete calculus chapter"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  placeholder="e.g. Mathematics"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value as Task["priority"]
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">
                    Medium
                  </option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <FaPlus />
                Add Task
              </button>
            </form>
          </div>

          {/* Tasks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* Task Header */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  My Tasks
                </h2>

                <p className="text-sm text-slate-500">
                  {pendingCount} tasks remaining
                </p>
              </div>

              {/* Filters */}
              <div className="flex rounded-lg bg-slate-100 p-1">
                {(
                  [
                    "All",
                    "Pending",
                    "Completed",
                  ] as const
                ).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      filter === item
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600">
                  <FaCheck />
                </div>

                <h3 className="font-semibold text-slate-800">
                  No tasks here
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new task and start studying.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <article
                    key={task.id}
                    className={`rounded-xl border p-4 transition hover:shadow-sm ${
                      task.completed
                        ? "border-slate-100 bg-slate-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">

                      {/* Complete Button */}
                      <button
                        onClick={() =>
                          toggleTask(task.id)
                        }
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                          task.completed
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300 hover:border-blue-500"
                        }`}
                      >
                        {task.completed && (
                          <FaCheck className="text-[9px]" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={`font-medium ${
                              task.completed
                                ? "text-slate-400 line-through"
                                : "text-slate-800"
                            }`}
                          >
                            {task.title}
                          </h3>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityStyle[task.priority]}`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <FaBookOpen />
                            {task.subject}
                          </span>

                          {task.dueDate && (
                            <span className="flex items-center gap-1.5">
                              <FaCalendarAlt />
                              {new Date(
                                `${task.dueDate}T00:00:00`
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          deleteTask(task.id)
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Delete task"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TaskPage;