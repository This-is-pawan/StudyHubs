"use client";

import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaExternalLinkAlt,
  FaUserFriends,
  FaFileAlt,
  FaYoutube,
  FaLink,
} from "react-icons/fa";

interface SharedItem {
  id: number;
  title: string;
  subject: string;
  type: "Note" | "Video" | "Document" | "Link";
  sharedBy: string;
  url: string;
  createdAt: string;
}

const SharedPage = () => {
  const [items, setItems] = useState<SharedItem[]>([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [sharedBy, setSharedBy] = useState("");
  const [url, setUrl] = useState("");

  const [type, setType] =
    useState<SharedItem["type"]>("Document");

  useEffect(() => {
    const saved = localStorage.getItem(
      "studyhub-shared"
    );

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const saveItems = (updated: SharedItem[]) => {
    setItems(updated);

    localStorage.setItem(
      "studyhub-shared",
      JSON.stringify(updated)
    );
  };

  const addItem = () => {
    if (!title.trim()) return;

    const newItem: SharedItem = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "General",
      type,
      sharedBy: sharedBy.trim() || "Unknown",
      url: url.trim(),
      createdAt: new Date().toISOString(),
    };

    saveItems([newItem, ...items]);

    setTitle("");
    setSubject("");
    setSharedBy("");
    setUrl("");
    setType("Document");
  };

  const deleteItem = (id: number) => {
    saveItems(
      items.filter((item) => item.id !== id)
    );
  };

  const filteredItems = items.filter((item) =>
    `${item.title} ${item.subject} ${item.sharedBy} ${item.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getIcon = (type: SharedItem["type"]) => {
    if (type === "Video") {
      return (
        <FaYoutube className="text-red-500" />
      );
    }

    if (type === "Link") {
      return (
        <FaLink className="text-purple-500" />
      );
    }

    return (
      <FaFileAlt className="text-blue-500" />
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Shared
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Resources shared with you by classmates
            and friends.
          </p>
        </div>

        {/* Add Shared Resource */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-800">
              Add Shared Resource
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Save a resource someone shared with you.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Resource title"
              className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              placeholder="Subject"
              className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={sharedBy}
              onChange={(e) =>
                setSharedBy(e.target.value)
              }
              placeholder="Shared by"
              className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as SharedItem["type"]
                )
              }
              className="rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="Document">
                Document
              </option>

              <option value="Note">
                Note
              </option>

              <option value="Video">
                Video
              </option>

              <option value="Link">
                Link
              </option>
            </select>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Resource URL (optional)"
              className="flex-1 rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={addItem}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              <FaPlus />
              Add Resource
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <FaSearch className="text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search shared resources..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Empty */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600">
              <FaUserFriends />
            </div>

            <h2 className="font-semibold text-slate-700">
              Nothing shared yet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Shared study resources will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-xl">
                    {getIcon(item.type)}
                  </div>

                  <button
                    onClick={() =>
                      deleteItem(item.id)
                    }
                    className="text-slate-300 transition hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                      {item.subject}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.type}
                    </span>
                  </div>

                  <h2 className="mt-3 font-semibold text-slate-800">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Shared by{" "}
                    <span className="font-medium">
                      {item.sharedBy}
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      Open
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default SharedPage;