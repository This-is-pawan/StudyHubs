"use client";

import { useEffect, useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

interface Folder {
  id: number;
  name: string;
  subject: string;
  createdAt: string;
}

const FolderPage = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("studyhub-folders");

    if (saved) {
      setFolders(JSON.parse(saved));
    }
  }, []);

  const saveFolders = (updated: Folder[]) => {
    setFolders(updated);

    localStorage.setItem(
      "studyhub-folders",
      JSON.stringify(updated)
    );
  };

  const createFolder = () => {
    if (!name.trim()) return;

    const folder: Folder = {
      id: Date.now(),
      name: name.trim(),
      subject: subject.trim() || "General",
      createdAt: new Date().toISOString(),
    };

    saveFolders([folder, ...folders]);

    setName("");
    setSubject("");
  };

  const deleteFolder = (id: number) => {
    saveFolders(
      folders.filter((folder) => folder.id !== id)
    );
  };

  const filteredFolders = folders.filter((folder) =>
    `${folder.name} ${folder.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-slate-900">
            Folders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organize notes and study resources by subject.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">
            Create Folder
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Folder name"
              className="flex-1 rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="flex-1 rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={createFolder}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              <FaPlus />
              Create
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex max-w-md items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <FaSearch className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search folders..."
            className="w-full text-sm outline-none"
          />
        </div>

        {filteredFolders.length === 0 ? (
          <div className="py-20 text-center">
            <FaFolderOpen className="mx-auto mb-4 text-5xl text-blue-200" />

            <h2 className="font-semibold text-slate-700">
              No folders yet
            </h2>

            <p className="text-sm text-slate-500">
              Create a folder to organize your resources.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFolders.map((folder) => (
              <article
                key={folder.id}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <FaFolder className="text-4xl text-blue-500" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFolder(folder.id);
                    }}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>

                <h2 className="mt-5 font-semibold text-slate-800">
                  {folder.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {folder.subject}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  Created{" "}
                  {new Date(
                    folder.createdAt
                  ).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default FolderPage;