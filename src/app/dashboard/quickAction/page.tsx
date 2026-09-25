import Image from "next/image";
import React from "react";
import image from "../../../../public/success_step.svg";
import {
  FaPlus,
  FaRegStickyNote,
  FaCloudUploadAlt,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
interface QuickActionItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  href:string;
}

const quickActions: QuickActionItem[] = [
  {
    id: 1,
    title: "Add Task",
    href:'/dashboard/task',
    icon: <FaPlus />,
  },
  {
    id: 2,
    title: "New Note",
    href:'/dashboard',
    icon: <FaRegStickyNote />,
  },
  {
    id: 3,
    title: "Upload Resource",
    href:'/dashboard',
    icon: <FaCloudUploadAlt />,
  },
  {
    id: 4,
    title: "Save YouTube Video",
    href:'/dashboard',
    icon: <FaYoutube />,
  },
];

const QuickAction = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-5 ">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between  m-2">
        <h2 className="text-lg font-semibold text-slate-800">
          Quick Actions
        </h2>

        <button className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
          View all
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {quickActions.map((item) => (
          <Link
          href={item.href}
            key={item.id}
            className="group flex items-center gap-3 rounded-xl border border-blue-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              {item.icon}
            </span>

            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
           {item.title}   
            </span>
          </Link>
        ))}
      </div>
      <article className="shadow-sm mt-6 flex p-2 rounded-md capitalize font-bold gap-2 items-center justify-bewten">
        <p className="font-serif text-base italic tracking-wide text-blue-800">
 <span className="text-green-500 text-xl">“</span>Small steps every day lead to big results<span className="text-green-500 text-xl">”</span>
</p>
        <Image src={image} alt="success" width={60} height={20}/>
      </article>
    </section>
  );
};

export default QuickAction;