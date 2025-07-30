import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (email, password) => {
    try {
      const response = await axios.post('https://post-xw77.onrender.com/auth/login', { email, password });
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

  signupUser: async (email, phoneNumber, password) => {
    try {
      const response = await axios.post('https://post-xw77.onrender.com/auth/signup', { email, phoneNumber, password });
      const { user, token } = response.data;
      set({ isLoggedIn: true, user, token });
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
  }
}));

export default useAuthStore;
