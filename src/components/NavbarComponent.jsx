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
    <nav className="bg-white dark:bg-bg dark-text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faRecycle}
              className="text-ecoGreen animate-spin-slow"
              size="2x"
            />
            <div className="text-2xl font-bold ">EcoCycle</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#about" className=" hover:text-gray-500">
              About
            </a>
            <a href="#contact" className=" hover:text-gray-500">
              Contact
            </a>
            <a href="#donation" className=" hover:text-gray-500">
              Donation
            </a>
            <a href="#recycle" className=" hover:text-gray-500">
              Recycle
            </a>
            <a href="#diy" className=" hover:text-gray-500">
              DIY
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className=" hover:text-gray-500">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            <button className=" hover:text-gray-500">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </button>
            <ColorModeSwitch />
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black hover:text-gray-500 focus:outline-none"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a
            href="#about"
            className="block px-4 py-2 text-black hover:text-gray-500"
          >
            About
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 text-black hover:text-gray-500"
          >
            Contact
          </a>
          <a
            href="#donation"
            className="block px-4 py-2 text-black hover:text-gray-500"
          >
            Donation
          </a>
          <a
            href="#recycle"
            className="block px-4 py-2 text-black hover:text-gray-500"
          >
            Recycle
          </a>
          <a
            href="#diy"
            className="block px-4 py-2 text-black hover:text-gray-500"
          >
            DIY
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
