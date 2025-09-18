import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  async function register(name, email, password) {
    try {
      const res = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
      });
      const { message } = res.data;
      return { success: true, message };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  }

  async function login(email, password) {
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      const { message, user, token } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      return { success: true, message };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  }

  async function fetchUser() {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
