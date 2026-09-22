
"use client";

import { useState } from "react";
import Image from "next/image";

import { FaAddressCard, FaCalendarCheck, FaSearch } from "react-icons/fa";
import { BsCommand } from "react-icons/bs";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosNotificationsOutline,
  IoIosPartlySunny,
} from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";

import image from "../favicon.ico";

const Dashboardpage = () => {
  const [arrow, setArrow] = useState(false);

  return (
    <section className="min-h-screen w-full rounded-2xl bg-slate-50 p-3 sm:p-4 md:p-6">
      {/* Topbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="flex w-full items-center rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 lg:max-w-xl">
            <FaSearch className="ml-3 shrink-0 text-sm text-blue-500" />

            <input
              type="text"
              placeholder="Search anything..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
            />

            <div className="mr-2 hidden shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500 shadow-sm sm:flex">
              <BsCommand />
              <span>K</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600 sm:px-4"
            >
              <span className="sm:hidden">+</span>
              <span className="hidden sm:inline">+ Add</span>
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-blue-500"
            >
              <IoIosNotificationsOutline className="text-2xl" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2">
              <Image
                src={image}
                alt="Profile"
                width={38}
                height={38}
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              />

              <button
                type="button"
                aria-label="Open profile menu"
                onClick={() => setArrow((prev) => !prev)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
              >
                {arrow ? (
                  <IoIosArrowUp className="text-lg" />
                ) : (
                  <IoIosArrowDown className="text-lg" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-blue-600 sm:text-3xl">
          Welcome back,{'Axel !'}
        </h1>

        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Keep learning, keep growing.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Tasks */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <IoIosPartlySunny className="text-2xl text-amber-500" />
            </div>

            <span className="text-2xl font-bold text-slate-800">5</span>
          </div>

          <h2 className="mt-4 font-semibold text-slate-800">
            Today&apos;s Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tasks waiting to be completed
          </p>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FaCalendarCheck className="text-xl text-blue-500" />
            </div>

            <span className="text-2xl font-bold text-slate-800">3</span>
          </div>

          <h2 className="mt-4 font-semibold text-slate-800">
            Upcoming Events
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Events scheduled for today
          </p>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
              <FaNoteSticky className="text-xl text-purple-500" />
            </div>

            <span className="text-2xl font-bold text-slate-800">12</span>
          </div>

          <h2 className="mt-4 font-semibold text-slate-800">
            Notes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Notes saved in your workspace
          </p>
        </div>

        {/* Shared */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <FaAddressCard className="text-xl text-emerald-500" />
            </div>

            <span className="text-2xl font-bold text-slate-800">8</span>
          </div>

          <h2 className="mt-4 font-semibold text-slate-800">
            Shared
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Resources shared with you
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboardpage;

