// @ts-nocheck
"use client";

import { useState } from "react";
import { VscLoading } from "react-icons/vsc";

const AppearancePage = () => {
  const [theme, setTheme] = useState("light");
  const [loading,setLoading]=useState(false)
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Appearance
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Customise how StudyHub looks.
      </p>

      <div className="mt-7">
        <h3 className="font-semibold">
          Theme
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {["light", "dark", "system"].map((item) => (
            <button
              key={item}
              onClick={() => setTheme(item)}
              className={`rounded-xl border p-5 text-left capitalize transition ${
                theme === item
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <div
                className={`mb-4 h-20 rounded-lg ${
                  item === "dark"
                    ? "bg-slate-900"
                    : item === "system"
                      ? "bg-gradient-to-r from-white to-slate-900"
                      : "bg-slate-100"
                }`}
              />

              <p className="font-medium">
                {item}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="mt-8">
        <label className="font-semibold">
          Interface Size
        </label>

        <select className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>

      <button className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        {loading?<VscLoading  className="animate-spin transition-all text-center text-2xl"/>:'Save Appearance'}
        
      </button>
    </section>
  );
};

export default AppearancePage;