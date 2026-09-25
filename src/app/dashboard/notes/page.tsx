"use client";

import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaRegStickyNote,
  FaTimes,
} from "react-icons/fa";

interface Note {
  id: number;
  title: string;
  content: string;
  subject: string;
  createdAt: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("studyhub-notes");

    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const saveNotes = (updated: Note[]) => {
    setNotes(updated);

    localStorage.setItem(
      "studyhub-notes",
      JSON.stringify(updated)
    );
  };

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "General",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    saveNotes([newNote, ...notes]);

    setTitle("");
    setSubject("");
    setContent("");
    setShowForm(false);
  };

  const deleteNote = (id: number) => {
    saveNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.subject} ${note.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Notes
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create and organize your study notes.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <FaPlus />
            New Note
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex max-w-lg items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <FaSearch className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Create Note
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
              />

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your notes..."
                rows={7}
                className="w-full resize-none rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={addNote}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Note
              </button>
            </div>
          </div>
        )}

        {/* Notes */}
        {filteredNotes.length === 0 ? (
          <div className="py-24 text-center">
            <FaRegStickyNote className="mx-auto mb-4 text-4xl text-blue-200" />

            <h2 className="font-semibold text-slate-700">
              No notes yet
            </h2>

            <p className="text-sm text-slate-500">
              Create your first study note.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                    {note.subject}
                  </span>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>

                <h2 className="mt-4 text-lg font-semibold text-slate-800">
                  {note.title}
                </h2>

                <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500">
                  {note.content}
                </p>

                <p className="mt-5 text-xs text-slate-400">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default NotesPage;