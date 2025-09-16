import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faShoppingCart,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import CartSidebar from "./CartSidebar";
import { useCart } from "../hooks/useCart";

// Menu links array
const MENU_LINKS = [
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Store", path: "/store" },
  { name: "Donation", path: "#" },
  { name: "FAQs", path: "/faq" },
  { name: "Events", path: "/events" },
  { name: "Partners", path: "/partners" },
  { name: "DIY", path: "#" },
];

// Cart Button Component
const CartButton = ({ onClick }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="hover:text-gray-500 relative" onClick={onClick}>
      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-ecoGreen text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
};

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-bg dark:text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faRecycle}
            className="text-ecoGreen animate-spin-slow"
            size="2x"
          />
          <span className="text-2xl font-bold">EcoCycle</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-gray-500"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link to="/register" className="hover:text-gray-500">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>

          <CartButton onClick={() => setCartOpen(true)} />
          <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-white dark:bg-bg h-[100dvh] shadow-lg z-40 flex flex-col p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-black dark:text-white hover:text-gray-500 mb-6"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          <div className="flex flex-col space-y-4">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg text-black dark:text-white hover:text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
