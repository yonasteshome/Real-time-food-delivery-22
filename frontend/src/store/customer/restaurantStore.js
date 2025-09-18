// src/store/restaurantStore.js
import { create } from "zustand";
import { fetchNearbyRestaurants } from "../../api/customer/restaurantApi";

const useRestaurantStore = create((set) => ({
  restaurants: [],
  filters: [],
  activeFilter: "All",
  loading: false,
  error: null,

  fetchRestaurants: async (lat, lng) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchNearbyRestaurants(lat, lng);

      const uniqueTypes = [
        ...new Set(data.map((r) => r.type).filter(Boolean)),
      ].sort();

      set({
        restaurants: data,
        filters: ["All", ...uniqueTypes],
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setActiveFilter: (filter) => set({ activeFilter: filter }),
}));

export default useRestaurantStore;
