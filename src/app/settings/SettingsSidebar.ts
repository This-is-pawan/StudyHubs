"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement } from "react";

import { FaUser, FaBell, FaLock, FaPalette } from "react-icons/fa";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdOutlineStorage } from "react-icons/md";

const links = [
  {
    name: "Account",
    href: "/settings",
    icon: FaUser,
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
    icon: FaBell,
  },
  {
    name: "Privacy",
    href: "/settings/privacy",
    icon: FaLock,
  },
  {
    name: "Appearance",
    href: "/settings/appearance",
    icon: FaPalette,
  },
  {
    name: "Storage",
    href: "/settings/storage",
    icon: MdOutlineStorage,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: FaPersonArrowUpFromLine,
  },
];

const SettingsSidebar = () => {
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

export default SettingsSidebar;