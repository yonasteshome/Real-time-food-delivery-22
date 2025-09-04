import { create } from "zustand";
import useAuthStore from "../../store/restaurant/authStore";
import {
  fetchMenuApi,
  createMenuItemApi,
  updateMenuItemApi,
  deleteMenuItemApi,
} from "../../api/restaurant/menuApi";

const useMenuStore = create((set, get) => ({
  menuItems: [],
  loading: false,
  error: null,

  fetchMenu: async () => {
    const restaurantId = useAuthStore.getState().restaurantId;
    if (!restaurantId) return;

    set({ loading: true, error: null });
    try {
      const res = await fetchMenuApi(restaurantId);
      set({ menuItems: res || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addMenuItem: async (item) => {
    const restaurantId = useAuthStore.getState().restaurantId;
    if (!restaurantId) return;

    try {
      const savedItem = await createMenuItemApi(restaurantId, item);
      set((state) => ({ menuItems: [...state.menuItems, savedItem] }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateMenuItem: async (itemId, item) => {
    const restaurantId = useAuthStore.getState().restaurantId;
    if (!restaurantId) return;
  
    // Optimistically mark pending
    set((state) => ({
      menuItems: state.menuItems.map((m) =>
        m._id === itemId ? { ...m, ...item, pending: true } : m
      ),
    }));
  
    try {
      const updatedItem = await updateMenuItemApi(restaurantId, itemId, item);
  
      // Merge API response with the existing item to avoid losing fields
      set((state) => ({
        menuItems: state.menuItems.map((m) =>
          m._id === itemId
            ? { ...m, ...updatedItem, pending: false } // merge updated fields
            : m
        ),
      }));
    } catch (err) {
      // Revert pending and show error
      set((state) => ({
        menuItems: state.menuItems.map((m) =>
          m._id === itemId ? { ...m, pending: false } : m
        ),
        error: err.message,
      }));
    }
  },
  

  deleteMenuItem: async (itemId) => {
    const restaurantId = useAuthStore.getState().restaurantId;
    if (!restaurantId) return;

    const previous = get().menuItems;
    set((state) => ({
      menuItems: state.menuItems.filter((m) => m._id !== itemId),
    }));

    try {
      await deleteMenuItemApi(restaurantId, itemId);
    } catch (err) {
      set({ menuItems: previous, error: err.message });
    }
  },
}));

export default useMenuStore;
