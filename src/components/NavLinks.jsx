import { Link } from "react-router-dom";
import { MENU_LINKS } from "../data/MenuLinks";

const NavLinks = ({ onClick, isMobile = false }) => {
  return (
    <>
      {MENU_LINKS.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          onClick={onClick}
          className={`hover:text-gray-500 ${
            isMobile ? "text-lg  text-black font-semibold dark:text-white" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
