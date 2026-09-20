'use client'
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";


const SettingsPage = () => {
const[loading,setLoading]=useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Account
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Manage your personal account information.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="pawan Kumar"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="pawan@example.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Username */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Username
          </label>

          <input
            type="text"
            placeholder="pawan"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+917889772832"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
         {loading?<VscLoading  className="animate-spin transition-all text-center text-2xl"/>:'  Save Changes'}
       
      </button>
    </section>
  );
};

export default SettingsPage;