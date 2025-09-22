import { Outlet } from "react-router-dom";
import UserSideBar from "./UserSideBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <UserSideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
