"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement } from "react";

import {
  FaUser,
  FaTasks,
  FaStickyNote,
  FaFolder,
  FaCalendarAlt,
  FaChartLine,
  FaShareAlt,
  FaSearch,
  FaCog,
  FaClock,
} from "react-icons/fa";

import { MdOndemandVideo, MdDashboard } from "react-icons/md";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Timetable",
    href: "/dashboard/timetable",
    icon: FaClock,
  },
  {
    name: "Task",
    href: "/dashboard/task",
    icon: FaTasks,
  },
  {
    name: "Notes",
    href: "/dashboard/notes",
    icon: FaStickyNote,
  },
  {
    name: "Videos",
    href: "/dashboard/videos",
    icon: MdOndemandVideo,
  },
  {
    name: "Folders",
    href: "/dashboard/folders",
    icon: FaFolder,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: FaCalendarAlt,
  },
  {
    name: "Progress",
    href: "/dashboard/progress",
    icon: FaChartLine,
  },
  {
    name: "Shared",
    href: "/dashboard/shared",
    icon: FaShareAlt,
  },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: FaSearch,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: FaUser,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: FaCog,
  },
];

const DashboardLinks = () => {
  const pathname = usePathname();

  return createElement(
    "aside",
    { className: "h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" },
    createElement(
      "nav",
      { className: "space-y-2" },
      links.map((item) => {
        const active = pathname === item.href;

        return createElement(
          Link,
          {
            key: item.href,
            href: item.href,
            className: `flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
              active
                ? "bg-blue-50 font-medium text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`,
          },
          createElement("span", { className: "text-lg" },
          createElement(item.icon)),
          createElement("span", null, item.name),
        );
      }),
    ),
  );
};

export default DashboardLinks;