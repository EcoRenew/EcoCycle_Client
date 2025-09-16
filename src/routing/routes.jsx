import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPages";
import Layout from "../components/Layout";
import StorePage from "../pages/StorePage";
import Register from "../components/auth/Register/Register";
import Login from "../components/auth/Login/Login";
import FAQPage from "../pages/FAQPage";
import CategoryPage from "../pages/CategoryPage";
import EventsPage from "../pages/EventsPage";
import PartnersPage from "../pages/PartnersPage";
import AdminApp from "../admin/AdminApp";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminLayout from "../admin/components/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import UserManagement from "../admin/pages/UserManagement";
import ContentManagement from "../admin/pages/ContentManagement";
import DonationRequests from "../admin/pages/DonationRequests";
import Partnerships from "../admin/pages/Partnerships";
import Settings from "../admin/pages/Settings";
import AdminRouteGuard from "../admin/components/AdminRouteGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "store", element: <StorePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "faq", element: <FAQPage /> },
      { path: "category/:type", element: <CategoryPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "partners", element: <PartnersPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "",
        element: (
          <AdminRouteGuard>
            <AdminLayout />
          </AdminRouteGuard>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <UserManagement /> },
          { path: "content", element: <ContentManagement /> },
          { path: "donations", element: <DonationRequests /> },
          { path: "partnerships", element: <Partnerships /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

export default router;
