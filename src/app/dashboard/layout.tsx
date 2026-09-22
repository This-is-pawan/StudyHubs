import React from "react";
import DashboardLinks from "./dashboardLinks";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return React.createElement(
    "main",
    { className: "min-h-screen bg-slate-50 px-4 pb-12 pt-24 text-slate-900" },
    React.createElement(
      "section",
      { className: "mx-auto w-full max-w-6xl" },
      React.createElement(
        "div",
        { className: "mb-8" },
        React.createElement(
          "h1",
          { className: "text-3xl font-bold sm:text-4xl" },
          "Settings"
        ),
        React.createElement(
          "p",
          { className: "mt-2 text-slate-500" },
          "Manage your StudyHub account and preferences."
        )
      ),
      React.createElement(
        "div",
        { className: "grid gap-6 md:grid-cols-[240px_1fr]" },
        React.createElement( DashboardLinks ),
        React.createElement("section", null, children)
      )
    )
  );
};

export default DashboardLayout;