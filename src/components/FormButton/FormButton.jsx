import React from "react";
// import style from './FormButton.module.css'

export default function FormButton({ children }) {
  return (
    <div>
      <button
        className="flex w-full justify-center rounded-md border border-transparent bg-[var(--login-button-color)] py-3 px-4 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--login-button-color)] focus:ring-offset-2"
        type="submit"
      >
        {children}
      </button>
    </div>
  );
}
