import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};
export default Layout;
