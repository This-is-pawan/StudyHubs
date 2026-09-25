"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaBookOpen,
  FaSave,
  FaCamera,
} from "react-icons/fa";

interface UserProfile {
  name: string;
  email: string;
  course: string;
  college: string;
  goal: string;
  bio: string;
}

const defaultProfile: UserProfile = {
  name: "",
  email: "",
  course: "",
  college: "",
  goal: "",
  bio: "",
};

const ProfilePage = () => {
  const [profile, setProfile] =
    useState<UserProfile>(defaultProfile);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(
      "studyhub-profile"
    );

    if (existing) {
      setProfile(JSON.parse(existing));
    }
  }, []);

  const handleChange = (
    field: keyof UserProfile,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveProfile = () => {
    localStorage.setItem(
      "studyhub-profile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const initials =
    profile.name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SH";

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal and study information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Profile Card */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="relative mx-auto w-fit">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                {initials}
              </div>

              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-xs text-white shadow"
                title="Profile photo support can be added later"
              >
                <FaCamera />
              </button>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              {profile.name || "Student"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {profile.email || "Add your email"}
            </p>

            {profile.course && (
              <div className="mt-5 rounded-xl bg-blue-50 p-3">
                <p className="text-xs text-blue-500">
                  Currently studying
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {profile.course}
                </p>
              </div>
            )}
          </aside>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your StudyHub profile.
              </p>
            </div>

            <div className="space-y-5">
              {/* Name / Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <FaUser className="text-sm text-slate-400" />

                    <input
                      value={profile.name}
                      onChange={(e) =>
                        handleChange(
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Your name"
                      className="w-full py-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <FaEnvelope className="text-sm text-slate-400" />

                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleChange(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="student@example.com"
                      className="w-full py-3 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Course / College */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Course / Exam
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 focus-within:border-blue-500">
                    <FaBookOpen className="text-slate-400" />

                    <input
                      value={profile.course}
                      onChange={(e) =>
                        handleChange(
                          "course",
                          e.target.value
                        )
                      }
                      placeholder="e.g. GATE CSE"
                      className="w-full py-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    College / University
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 focus-within:border-blue-500">
                    <FaGraduationCap className="text-slate-400" />

                    <input
                      value={profile.college}
                      onChange={(e) =>
                        handleChange(
                          "college",
                          e.target.value
                        )
                      }
                      placeholder="Your college"
                      className="w-full py-3 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Study Goal
                </label>

                <input
                  value={profile.goal}
                  onChange={(e) =>
                    handleChange(
                      "goal",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Complete GATE syllabus before December"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  About Me
                </label>

                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    handleChange(
                      "bio",
                      e.target.value
                    )
                  }
                  placeholder="Write something about your studies..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Save */}
              <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-5">
                {saved && (
                  <span className="text-sm font-medium text-green-600">
                    Profile saved ✓
                  </span>
                )}

                <button
                  onClick={saveProfile}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;