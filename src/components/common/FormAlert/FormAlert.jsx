import React from "react";

export default function FormAlert({ message, type = "error" }) {
  const typeClasses =
    type === "error"
      ? "text-red-800 bg-red-50 dark:text-red-400"
      : "text-green-800 bg-green-50 dark:text-green-400";

  return (
    <div className={`p-2 mb-4 text-sm rounded-lg ${typeClasses}`}>
      {message}
    </div>
  );
}
