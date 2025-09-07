import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faShoppingCart,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faRecycle}
              className="text-ecoGreen animate-spin-slow"
              size="2x"
            />
            <div className="text-2xl font-bold text-black">EcoCycle</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="text-black hover:text-gray-500">
              About
            </a>
            <a href="#contact" className="text-black hover:text-gray-500">
              Contact
            </a>
            <a href="#donation" className="text-black hover:text-gray-500">
              Donation
            </a>
            <a href="#recycle" className="text-black hover:text-gray-500">
              Recycle
            </a>
            <a href="#diy" className="text-black hover:text-gray-500">
              DIY
            </a>
          </div>

          {/* Right Side (User + Cart always visible) */}
          <div className="flex items-center space-x-4">
            <button className="text-black hover:text-gray-500">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            <button className="text-black hover:text-gray-500">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </button>

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
