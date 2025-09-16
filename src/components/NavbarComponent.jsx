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
import { Link } from "react-router-dom";
const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-bg dark:text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faRecycle}
                className="text-ecoGreen animate-spin-slow"
                size="2x"
              />
              <div className="text-2xl font-bold">EcoCycle</div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            <a href="/about" className="hover:text-gray-500">
              About
            </a>
            <a href="/contact" className="hover:text-gray-500">
              Contact
            </a>
            <a href="/store" className="hover:text-gray-500">
              Store
            </a>
            <a href="#" className="hover:text-gray-500">
              Donation
            </a>

            <a href="/faq" className="hover:text-gray-500">
              FAQs
            </a>
            <a href="/events" className="hover:text-gray-500">
              Events
            </a>
            <a href="/partners" className="hover:text-gray-500">
              Partners
            </a>
            <a href="/diy" className="hover:text-gray-500">
              DIY
            </a>
            <a href="/community" className="hover:text-gray-500">
              Community
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link to="/register" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Link>

            <button className="hover:text-gray-500">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </button>
            <ColorModeSwitch />
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
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
        <div className="lg:hidden fixed inset-0 bg-white dark:bg-bg h-[100dvh] shadow-lg z-40 flex flex-col">
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
              href="/about"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Store
            </a>
            <a
              href="#"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Donation
            </a>

            <a
              href="/faq"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              FAQs
            </a>
            <a
              href="/events"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Events
            </a>
            <a
              href="/partners"
              className="text-lg text-black dark:text-white hover:text-gray-500"
            >
              Partners
            </a>
            <a
              href="/diy"
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
