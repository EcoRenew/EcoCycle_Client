import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session on mount
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      setAdminToken(token);
      setAdminUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate admin login - replace with actual API call
      if (email === 'admin@ecocycle.com' && password === 'admin123') {
        const token = 'admin-token-123';
        const user = {
          id: 1,
          name: 'Admin User',
          email: 'admin@ecocycle.com',
          role: 'admin'
        };
        
        setAdminToken(token);
        setAdminUser(user);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid admin credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  const isAuthenticated = () => {
    return !!adminToken && !!adminUser;
  };

  const value = {
    adminUser,
    adminToken,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
