import axios from "axios";
import { createContext, useContext, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

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
      return { success: true, message, user, token };
    } catch (error) {
      const data = error.response?.data || {};
      return {
        success: false,
        message: data.message || "Something went wrong",
        email_not_verified: data.email_not_verified || false,
      };
    }
  }

  async function verifyEmail(id, hash) {
    try {
      const res = await axios.get(`${API_URL}/email/verify/${id}/${hash}`);
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  }

  async function logout() {
    try {
      await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Logout failed",
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, verifyEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
