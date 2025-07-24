import React from "react";

export function Progress({ value }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
