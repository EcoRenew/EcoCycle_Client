import { useState } from "react";
import UserProfile from "./UserProfile";
import DashboardMenu from "./DashboardMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen w-72 bg-white dark:bg-[#25432E] shadow-md transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Menu
          </h2>
          <button
            className="p-2 rounded-md bg-green-600 text-white"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          <UserProfile />
          <DashboardMenu />
        </div>
      </aside>

      {!isOpen && (
        <div className="lg:hidden p-4">
          <button
            className="p-2 rounded-md bg-green-600 text-white"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default UserSideBar;
