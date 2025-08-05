// store.js
import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  pendingUser: null, // ✅ add this

  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/delivery/auth/login', { email, password });
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
      const response = await axios.post('http://localhost:5000/api/delivery/auth/register', {
        email,
        phone,
        password,
        role,
      });

      const { id, token } = response.data;

      // ✅ Save data for verification
      set({
        pendingUser: { id, email, phone, role },
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
    set({ isLoggedIn: false, user: null, token: null, pendingUser: null });
  },
}));

export default useAuthStore;
