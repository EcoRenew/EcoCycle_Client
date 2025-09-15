import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPages";
import Layout from "../components/Layout";
import StorePage from "../pages/StorePage";
import Register from "../components/auth/Register/Register";
import Login from "../components/auth/Login/Login";
import FAQPage from "../pages/FAQPage";
import EventsPage from "../pages/EventsPage";
import PartnersPage from "../pages/PartnersPage";

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
      { path: "events", element: <EventsPage /> },
      { path: "partners", element: <PartnersPage /> },
    ],
  },
]);
export default router;
