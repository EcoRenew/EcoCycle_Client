import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import CartSidebar from "./CartSidebar";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { useAuth } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext"; // use provider context

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ useCartContext only once
  const cart = useCartContext();

  const handleUserClick = () => {
    if (!user) navigate("/register");
    else navigate("/profile");
  };

  return (
    <nav className="bg-white dark:bg-bg dark:text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faRecycle}
            className="text-[#38af44] animate-spin-slow !w-9 !h-9 stroke-[40]"
          />
          <span className="text-2xl font-bold">EcoCycle</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <NavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* User Icon */}
          <button className="hover:text-gray-500" onClick={handleUserClick}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>

          {/* Cart */}
          <CartButton
            cartItems={cart.cartItems}
            onClick={() => setCartOpen(true)}
          />
          <CartSidebar
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
          />

          {/* Dark Mode Toggle */}
          <ColorModeSwitch />

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-gray-500"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </nav>
  );
};

export default NavbarComponent;
