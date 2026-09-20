"use client";

import {
  FaFileImage,
  FaFileVideo,
  FaFileAlt,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const StoragePage = () => {

  const [loading,setLoading]=useState(false)
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
          Cloud Storage
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage files stored in your StudyHub account.
        </p>

        {/* Storage */}
        <div className="mt-7">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              Storage Used
            </span>

            <span className="text-slate-500">
              2.4 GB / 10 GB
            </span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[24%] rounded-full bg-blue-600" />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            7.6 GB available
          </p>
        </div>
      </section>

      {/* Storage Types */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Storage Details
        </h2>

        <div className="mt-6 space-y-5">
          <StorageItem
            icon={<FaFileImage />}
            title="Images"
            storage="850 MB"
          />

          <StorageItem
            icon={<FaFileVideo />}
            title="Videos"
            storage="1.2 GB"
          />

          <StorageItem
            icon={<FaFileAlt />}
            title="Documents"
            storage="350 MB"
          />
        </div>
      </section>

      {/* Clear Storage */}
      <section className="rounded-2xl border border-red-200 bg-white p-6">
        <h2 className="text-xl font-bold">
          Manage Storage
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Remove unnecessary files to free up storage space.
        </p>

        <button className="mt-5 flex items-center gap-2 rounded-xl border border-red-300 px-5 py-3 text-red-600 hover:bg-red-50">
          <FaTrash />
           {loading?<VscLoading  className="animate-spin transition-all text-center text-2xl"/>: 'Clear Storage'}
         
        </button>
      </section>
    </div>
  );
};

const StorageItem = ({
  icon,
  title,
  storage,
}: {
  icon: any;
  title: string;
  storage: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <span className="font-medium">
          {title}
        </span>
      </div>

      <span className="text-sm text-slate-500">
        {storage}
      </span>
    </div>
  );
};

export default StoragePage;