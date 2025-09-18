import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({children}) {
    const {user} = useAuth();
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
}