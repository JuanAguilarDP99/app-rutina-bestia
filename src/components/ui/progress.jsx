import React from "react";

export function Progress({ value }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
