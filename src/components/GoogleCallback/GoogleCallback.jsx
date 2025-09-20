import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user") ? JSON.parse(params.get("user")) : null;

    if (token && user) {
      googleLogin(token, user);
      navigate("/");
    }
  }, [googleLogin, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">
          Logging you in with Google...
        </p>
      </div>
    </div>
  );
}
