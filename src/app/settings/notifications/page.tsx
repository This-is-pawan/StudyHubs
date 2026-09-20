
"use client";

import { useState } from "react";

const NotificationsPage = () => {
  const [studyReminder, setStudyReminder] = useState(true);
  const [taskReminder, setTaskReminder] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [sharingUpdates, setSharingUpdates] = useState(true);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Notifications
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Choose which notifications StudyHub should send you.
      </p>

      <div className="mt-7 divide-y">
        <SettingToggle
          title="Study Reminders"
          description="Receive reminders for your study schedule."
          enabled={studyReminder}
          onChange={() => setStudyReminder(!studyReminder)}
        />

        <SettingToggle
          title="Task Reminders"
          description="Get notified when study tasks are pending."
          enabled={taskReminder}
          onChange={() => setTaskReminder(!taskReminder)}
        />

        <SettingToggle
          title="Email Updates"
          description="Receive important StudyHub updates by email."
          enabled={emailUpdates}
          onChange={() => setEmailUpdates(!emailUpdates)}
        />

        <SettingToggle
          title="Sharing Notifications"
          description="Notify me when someone shares content with me."
          enabled={sharingUpdates}
          onChange={() => setSharingUpdates(!sharingUpdates)}
        />
      </div>
    </section>
  );
};

type SettingToggleProps = {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
};

const SettingToggle = ({
  title,
  description,
  enabled,
  onChange,
}: SettingToggleProps) => {
  return (
    <div className="flex items-center justify-between gap-5 py-5 first:pt-0">
      <div>
        <h3 className="font-medium">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-7 min-w-12 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationsPage;