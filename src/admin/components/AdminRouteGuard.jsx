
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminRouteGuard = ({ children }) => {
  const { adminToken, adminUser, loading, logout } = useAdminAuth();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!adminToken) {
        setIsValid(false);
        setVerifying(false);
        return;
      }
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${baseUrl}/admin/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Check if user is admin
          if (data.success && data.data && data.data.role === 'admin') {
            setIsValid(true);
          } else {
            logout();
            setIsValid(false);
          }
        } else {
          logout();
          setIsValid(false);
        }
      } catch (error) {
        logout();
        setIsValid(false);
      }
      setVerifying(false);
    };
    verifyAdmin();
    // eslint-disable-next-line
  }, [adminToken]);

  // Show loading spinner while checking authentication or verifying
  if (loading || verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecoGreen"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or not admin, redirect to admin login
  if (!adminToken || !adminUser || !isValid) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated and verified as admin, render the protected component
  return children;
};

export default AdminRouteGuard;
