import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // log out icon

const DashboardMenu = () => {
  const menuItems = [
    "Schedule Pickup",
    "Donation History",
    "Impact Report",
    "Settings",
  ];

  return (
    <div className="bg-white dark:bg-[#25432E] rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Dashboard
      </h3>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              index === 0
                ? "bg-green-100 text-green-700 font-medium"
                : "text-gray-600 dark:text-gray-400 hover:bg-green-100"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Elegant Log Out Button with Font Awesome */}
      <button className="mt-6 w-full p-3 rounded-xl flex items-center justify-center gap-2 bg-white dark:bg-red-600 text-red-600 dark:text-white border border-red-600 dark:border-transparent font-semibold shadow-sm hover:bg-red-50 dark:hover:bg-red-700 transition-all duration-300">
        <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
      </button>
    </div>
  );
};

export default DashboardMenu;
