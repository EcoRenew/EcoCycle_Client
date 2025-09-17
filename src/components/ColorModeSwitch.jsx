import { useState, useEffect } from "react";

const ColorModeSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
      html.classList.remove("light");
      setEnabled(true);
    } else {
      html.classList.add("light"); // add light class
      html.classList.remove("dark");
      setEnabled(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (enabled) {
      html.classList.remove("dark");
      html.classList.add("light"); // add light when dark removed
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      html.classList.remove("light"); // remove light when dark added
      localStorage.setItem("theme", "dark");
    }
    setEnabled(!enabled);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-[#1B3124]" : "bg-gray-400 dark:bg-gray-600"
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ColorModeSwitch;
