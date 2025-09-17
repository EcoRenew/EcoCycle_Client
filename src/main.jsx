import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./routing/routes.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import CartProvider from "./components/CartProvider.jsx"; // 👈 import your CartProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
