
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
      if (loading) {
        setVerifying(true);
        return;
      }
      console.log('AdminRouteGuard: Verifying admin', { adminToken: adminToken ? 'present' : 'missing', adminUser: adminUser ? 'present' : 'missing' });
      
      if (!adminToken || !adminUser) {
        console.log('AdminRouteGuard: No token or user, setting invalid');
        setIsValid(false);
        setVerifying(false);
        return;
      }

      // If we have token and user, we can immediately set as valid for navigation
      // The server verification can happen in the background
      setIsValid(true);
      setVerifying(false);

      // Token format verification removed because we use Laravel Sanctum plain-text tokens
      console.log('AdminRouteGuard: Token and user present, allowing access');
    };
    verifyAdmin();
    // eslint-disable-next-line
  }, [adminToken, adminUser, loading]);

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
    console.log('AdminRouteGuard: Redirecting to login', { adminToken: !!adminToken, adminUser: !!adminUser, isValid });
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log('AdminRouteGuard: Rendering protected component');
  // If authenticated and verified as admin, render the protected component
  return children;
};

export default AdminRouteGuard;
