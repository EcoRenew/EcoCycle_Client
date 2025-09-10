import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faShoppingCart,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import ColorModeSwitch from "./ColorModeSwitch";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-bg dark:text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faRecycle}
              className="text-ecoGreen animate-spin-slow"
              size="2x"
            />
            <div className="text-2xl font-bold">EcoCycle</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-500">
              About
            </a>
            <a href="#" className="hover:text-gray-500">
              Contact
            </a>
            <a href="#" className="hover:text-gray-500">
              Donation
            </a>
            <a href="#" className="hover:text-gray-500">
              Recycle
            </a>
            <a href="/faq" className="hover:text-gray-500">
              FAQs
            </a>
            <a href="#" className="hover:text-gray-500">
              DIY
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-500">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            <button className="hover:text-gray-500">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </button>
            <ColorModeSwitch />
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:text-gray-500 focus:outline-none"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Fullscreen */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-bg h-[100dvh] shadow-lg z-40 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-black dark:text-white hover:text-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col space-y-4 px-6">
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              About
            </a>
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Donation
            </a>
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Recycle
            </a>
            <a
              href="/faq"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              FAQs
            </a>
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              DIY
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
