import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPages";
import Layout from "../components/Layout";
import Register from "../components/auth/Register/Register";
import Login from "../components/auth/Login/Login";
import FAQPage from "../pages/FAQPage";
import CategoryPage from "../pages/CategoryPage";
import EventsPage from "../pages/EventsPage";
import PartnersPage from "../pages/PartnersPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "faq", element: <FAQPage /> },
      { path: "category/:type", element: <CategoryPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "partners", element: <PartnersPage /> },

    ],
  },
]);
export default router;
