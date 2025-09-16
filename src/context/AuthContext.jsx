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
      return { success: true, message };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
