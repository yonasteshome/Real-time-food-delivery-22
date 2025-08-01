// store.js
import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { user, token } = response.data;
      set({ isLoggedIn: true, user, token });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || "Login failed",
      };
    }
  },

  signupUser: async (email, phone, password, role) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        phone,
        password,
        role,
      });

      const { id, token } = response.data;

      set({
        isLoggedIn: true,
        user: { id, email, phone, role },
        token,
      });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || "Signup failed",
      };
    }
  },

  logout: () => {
    set({ isLoggedIn: false, user: null, token: null });
  },
}));

export default useAuthStore;
