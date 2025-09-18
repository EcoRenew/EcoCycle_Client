import React from "react";
<<<<<<< HEAD
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
=======
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({children}) {
    const {user} = useAuth();
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
}
>>>>>>> 86a96c8 (added logout and protected route (#32))
