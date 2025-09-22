import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom"; // for navigation + active link

const DashboardMenu = () => {
  // Define your pages here (title + route)
  const menuItems = [
    { name: "Profile", path: "" },
    { name: "Schedule Pickup", path: "schedule" },
    { name: "Donation History", path: "donations" },
    { name: "Impact Report", path: "impact" },
  ];

  const location = useLocation(); // to highlight the active page

  return (
    <div className="bg-white dark:bg-[#25432E]  p-6">
      <hr />

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-3 rounded-lg transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-green-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Elegant Log Out Button */}
      <button className="mt-6 w-full p-3 rounded-xl flex items-center justify-center gap-2 bg-white dark:bg-red-600 text-red-600 dark:text-white border border-red-600 dark:border-transparent font-semibold shadow-sm hover:bg-red-50 dark:hover:bg-red-700 transition-all duration-300">
        <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
      </button>
    </div>
  );
};

export default DashboardMenu;
