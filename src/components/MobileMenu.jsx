import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  //   faUserCircle,
  //   faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MobileMenu = ({ onClose }) => {
  return (
    <div className="lg:hidden fixed inset-0 bg-white dark:bg-bg h-[100dvh] shadow-lg z-40 flex flex-col p-6">
      <button
        onClick={onClose}
        className="self-end text-black dark:text-white hover:text-gray-500 mb-6"
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>

      <div className="flex flex-col space-y-4">
        <NavLinks onClick={onClose} isMobile />

        {/* Mobile User Options */}
        {/* <div className="border-t pt-4 mt-4">
          <Link
            to="/profile"
            className="flex items-center text-lg text-black dark:text-white hover:text-gray-500 py-2"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faUserCircle} className="mr-3" />
            View Profile
          </Link>

          <button
            onClick={() => {
              console.log("User logged out");
              onClose();
            }}
            className="flex items-center w-full text-left text-lg text-black dark:text-white hover:text-gray-500 py-2"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            Logout
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MobileMenu;
