
"use client";

import { useState } from "react";
import { VscLoading } from "react-icons/vsc";

const PrivacyPage = () => {
  const [profilePublic, setProfilePublic] = useState(false);
  const [allowSharing, setAllowSharing] = useState(true);
  const [activityVisible, setActivityVisible] = useState(false);
 const [loading,setLoading]=useState(false)
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
          Privacy
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Control how your StudyHub information is shared.
        </p>

        <div className="mt-6 space-y-6">
          <PrivacyToggle
            title="Public Profile"
            description="Allow other StudyHub users to view your profile."
            value={profilePublic}
            onChange={() => setProfilePublic(!profilePublic)}
          />

          <PrivacyToggle
            title="Allow Sharing"
            description="Allow others to share notes and resources with you."
            value={allowSharing}
            onChange={() => setAllowSharing(!allowSharing)}
          />

          <PrivacyToggle
            title="Show Study Activity"
            description="Allow others to see your study activity and progress."
            value={activityVisible}
            onChange={() => setActivityVisible(!activityVisible)}
          />
        </div>
      </section>

      {/* Password */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Change Password
        </h2>

        <div className="mt-5 space-y-4">
          <input
            type="password"
            placeholder="Current password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="New password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 ">
           {loading?<VscLoading  className="animate-spin transition-all text-center text-2xl"/>:'  Update Password'}
         
        </button>
      </section>

      {/* Danger */}
      <section className="rounded-2xl border border-red-200 bg-white p-6">
        <h2 className="text-xl font-bold text-red-600">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Permanently delete your account and StudyHub data.
        </p>

        <button className="mt-5 rounded-xl border border-red-300 px-5 py-3 font-medium text-red-600 hover:bg-red-50">
          {loading?<VscLoading  className="animate-spin transition-all text-center text-2xl"/>:' Delete Account'}
         
        </button>
      </section>
    </div>
  );
};

const PrivacyToggle = ({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 min-w-12 rounded-full ${
          value ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
            value ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default PrivacyPage;