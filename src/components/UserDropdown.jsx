import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const UserDropdown = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    const res = await logout();
    console.log(res.message);
    onClose();
  };

  return (
    <div
      className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#25432E] rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 ${
        isOpen ? "block" : "hidden"
      }`}
      onMouseLeave={onClose}
    >
      <Link
        to="/profile"
        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faUserCircle} className="mr-3" />
        View Profile
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
        Logout
      </button>
    </div>
  );
};

export default UserDropdown;
