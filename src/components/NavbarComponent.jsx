import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import CartSidebar from "./CartSidebar";
import CartButton from "./CartButton";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { useAuth } from "../context/AuthContext"; // ✅ import auth hook

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user } = useAuth(); // ✅ check if logged in
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (!user) {
      navigate("/register"); // redirect to register if not logged in
    } else {
      setUserDropdownOpen(true); // open dropdown if logged in
    }
  };

  return (
    <nav className="bg-white dark:bg-bg dark:text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl animate-spin-slow">♻️</span>
          <span className="text-2xl font-bold">EcoCycle</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <NavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* User Icon / Dropdown */}
          <div className="relative">
            <button
              className="hover:text-gray-500"
              onClick={handleUserClick}
              onMouseEnter={() => user && setUserDropdownOpen(true)}
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            {user && (
              <UserDropdown
                isOpen={userDropdownOpen}
                onClose={() => setUserDropdownOpen(false)}
              />
            )}
          </div>

          <CartButton onClick={() => setCartOpen(true)} />
          <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
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
