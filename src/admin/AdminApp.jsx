import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';

function AdminApp() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
}

export default AdminApp;