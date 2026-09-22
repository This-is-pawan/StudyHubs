"use client";
import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { BsCommand } from "react-icons/bs";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosNotificationsOutline,
} from "react-icons/io";

import image from "../favicon.ico";

const Dashboardpage = () => {
  const [arrow, setArrow] = useState(false);

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="flex w-full items-center rounded-lg border border-blue-200 bg-white transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 lg:max-w-xl">
          <FaSearch className="ml-3 shrink-0 text-sm text-blue-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
          />

          {/* Command key */}
          <div className="mr-2 hidden shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 sm:flex">
            <BsCommand />
            <span>K</span>
          </div>
        </div>

        {/* Right side actions */}
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
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-blue-500"
          >
            <IoIosNotificationsOutline className="text-2xl" />
          </button>

          <div className="flex items-center gap-2">
            <Image
              src={image}
              alt="Profile"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-slate-200 object-cover"
            />

            <button
              type="button"
              aria-label="Open profile menu"
              onClick={() => setArrow((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 cursor-pointer"
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
    </section>
  );
};

export default Dashboardpage;
