"use client";

import { useEffect, useState } from "react";
import {
  FaYoutube,
  FaPlus,
  FaTrash,
  FaExternalLinkAlt,
  FaSearch,
} from "react-icons/fa";

interface Video {
  id: number;
  title: string;
  subject: string;
  url: string;
}

const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("studyhub-videos");

    if (saved) {
      setVideos(JSON.parse(saved));
    }
  }, []);

  const saveVideos = (updated: Video[]) => {
    setVideos(updated);

    localStorage.setItem(
      "studyhub-videos",
      JSON.stringify(updated)
    );
  };

  const addVideo = () => {
    if (!title.trim() || !url.trim()) return;

    const video: Video = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "General",
      url: url.trim(),
    };

    saveVideos([video, ...videos]);

    setTitle("");
    setSubject("");
    setUrl("");
  };

  const deleteVideo = (id: number) => {
    saveVideos(videos.filter((video) => video.id !== id));
  };

  const filteredVideos = videos.filter((video) =>
    `${video.title} ${video.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">

        <div className="mb-7">
          <h1 className="text-3xl font-bold text-slate-900">
            Saved Videos
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Keep your learning videos in one place.
          </p>
        </div>

        {/* Add Video */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-800">
            Save YouTube Video
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video title"
              className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="YouTube URL"
              className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={addVideo}
            className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <FaPlus />
            Save Video
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex max-w-md items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <FaSearch className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="w-full text-sm outline-none"
          />
        </div>

        {/* Videos */}
        {filteredVideos.length === 0 ? (
          <div className="py-20 text-center">
            <FaYoutube className="mx-auto mb-3 text-5xl text-red-200" />

            <h2 className="font-semibold text-slate-700">
              No saved videos
            </h2>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                  <FaYoutube className="text-2xl text-red-500" />
                </div>

                <span className="text-xs font-medium text-blue-600">
                  {video.subject}
                </span>

                <h2 className="mt-1 font-semibold text-slate-800">
                  {video.title}
                </h2>

                <div className="mt-5 flex items-center justify-between">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                  >
                    Watch
                    <FaExternalLinkAlt className="text-xs" />
                  </a>

                  <button
                    onClick={() => deleteVideo(video.id)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default VideosPage;