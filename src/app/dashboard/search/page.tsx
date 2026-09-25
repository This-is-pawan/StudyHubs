"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaTasks,
  FaRegStickyNote,
  FaYoutube,
  FaFolder,
  FaCalendarAlt,
  FaUserFriends,
  FaArrowRight,
} from "react-icons/fa";

type SearchType =
  | "Task"
  | "Note"
  | "Video"
  | "Folder"
  | "Schedule"
  | "Shared";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: SearchType;
  href: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [filter, setFilter] = useState<"All" | SearchType>("All");

  useEffect(() => {
    const getData = (key: string) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "[]");
      } catch {
        return [];
      }
    };

    const tasks = getData("studyhub-tasks");
    const notes = getData("studyhub-notes");
    const videos = getData("studyhub-videos");
    const folders = getData("studyhub-folders");
    const schedules = getData("studyhub-schedules");
    const shared = getData("studyhub-shared");

    const allItems: SearchItem[] = [
      ...tasks.map((item: any) => ({
        id: `task-${item.id}`,
        title: item.title,
        description: `${item.subject || "General"} • ${
          item.completed ? "Completed" : "Pending"
        }`,
        type: "Task" as SearchType,
        href: "/task",
      })),

      ...notes.map((item: any) => ({
        id: `note-${item.id}`,
        title: item.title,
        description: `${item.subject || "General"} • ${
          item.content || ""
        }`,
        type: "Note" as SearchType,
        href: "/notes",
      })),

      ...videos.map((item: any) => ({
        id: `video-${item.id}`,
        title: item.title,
        description: item.subject || "General",
        type: "Video" as SearchType,
        href: "/videos",
      })),

      ...folders.map((item: any) => ({
        id: `folder-${item.id}`,
        title: item.name,
        description: item.subject || "General",
        type: "Folder" as SearchType,
        href: "/folder",
      })),

      ...schedules.map((item: any) => ({
        id: `schedule-${item.id}`,
        title: item.subject,
        description: `${item.day} • ${item.startTime} - ${item.endTime}`,
        type: "Schedule" as SearchType,
        href: "/timetable",
      })),

      ...shared.map((item: any) => ({
        id: `shared-${item.id}`,
        title: item.title,
        description: `${item.subject || "General"} • Shared by ${
          item.sharedBy || "Unknown"
        }`,
        type: "Shared" as SearchType,
        href: "/shared",
      })),
    ];

    setItems(allItems);
  }, []);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return [];

    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.type.toLowerCase().includes(value);

      const matchesFilter =
        filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [query, items, filter]);

  const getIcon = (type: SearchType) => {
    switch (type) {
      case "Task":
        return <FaTasks />;
      case "Note":
        return <FaRegStickyNote />;
      case "Video":
        return <FaYoutube />;
      case "Folder":
        return <FaFolder />;
      case "Schedule":
        return <FaCalendarAlt />;
      case "Shared":
        return <FaUserFriends />;
    }
  };

  const filters: ("All" | SearchType)[] = [
    "All",
    "Task",
    "Note",
    "Video",
    "Folder",
    "Schedule",
    "Shared",
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Search
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Search everything in your StudyHub.
          </p>
        </div>

        {/* Search Box */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <FaSearch className="text-lg text-slate-400" />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, notes, videos, subjects..."
            className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-sm font-medium text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Initial State */}
        {!query && (
          <div className="py-24 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              <FaSearch />
            </div>

            <h2 className="font-semibold text-slate-800">
              Search your StudyHub
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find notes, tasks, videos, folders and schedules.
            </p>
          </div>
        )}

        {/* No Result */}
        {query && results.length === 0 && (
          <div className="py-24 text-center">
            <h2 className="font-semibold text-slate-800">
              No results found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with another keyword.
            </p>
          </div>
        )}

        {/* Results */}
        {query && results.length > 0 && (
          <div className="mt-7">
            <p className="mb-4 text-sm text-slate-500">
              {results.length}{" "}
              {results.length === 1 ? "result" : "results"} found
            </p>

            <div className="space-y-3">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {getIcon(item.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate font-semibold text-slate-800">
                        {item.title}
                      </h2>

                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <FaArrowRight className="text-sm text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchPage;