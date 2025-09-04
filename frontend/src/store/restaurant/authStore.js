import { create } from "zustand";
import {
  loginApi,
  logoutApi,
  refreshTokenApi,
  signupRestaurantApi,
} from "../../api/restaurant/authApi";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  restaurantId: null,
  role: null,
  loading: true,
  pendingUser: null,

  // ------------------- LOGIN -------------------
  login: async (email, password) => {
    const res = await loginApi(email, password);
    if (res.success) {
      const data = res.data;
      set({
        isLoggedIn: true,
        user: data,
        restaurantId: data.restaurantId || null,
        role: data.role || null,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
    return res;
  },

  // ------------------- LOGOUT -------------------
  logout: async () => {
    await logoutApi();
    set({
      isLoggedIn: false,
      user: null,
      restaurantId: null,
      role: null,
      loading: false,
      pendingUser: null,
    });
  },

  // ------------------- CHECK SESSION -------------------
  checkAuth: async () => {
    set({ loading: true });
    const res = await refreshTokenApi();
    if (res.success) {
      const data = res.data;
      set({
        isLoggedIn: true,
        user: data,
        restaurantId: data.restaurantId || null,
        role: data.role || null,
        loading: false,
      });
    } else {
      set({
        isLoggedIn: false,
        user: null,
        restaurantId: null,
        role: null,
        loading: false,
      });
    }
    return res;
  },

  // ------------------- SIGNUP RESTAURANT -------------------
  signupRestaurant: async (email, phone, password, name, lng, lat, image) => {
    const res = await signupRestaurantApi(
      email,
      phone,
      password,
      name,
      lng,
      lat,
      image
    );
    if (res.success) {
      set({
        pendingUser: {
          id: res.data._id,
          email: res.payload.email,
          phone: res.payload.phone,
          name: res.payload.name,
          image: res.payload.image,
        },
      });
    }
    return res;
  },
}));

export default useAuthStore;
