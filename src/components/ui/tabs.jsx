import React from "react";

export function Tabs({ children, defaultValue, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function TabsList({ children, className }) {
  return (
    <div className={`flex gap-2 ${className || ""}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value }) {
  return (
    <button
      className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white transition"
      data-value={value}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }) {
  return <div data-content={value}>{children}</div>;
}
