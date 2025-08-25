import { create } from "zustand";

export const useInventoryStore = create((set) => ({
  inventory: [],
  loading: false,
  error: null,

  // Fetch inventory
  fetchInventory: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      set({ inventory: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch inventory", loading: false });
    }
  },

  // Update stock quantity
  updateStock: async (id, stock) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock }),
      });
      const updatedItem = await res.json();
      set((state) => ({
        inventory: state.inventory.map((i) => (i.id === id ? updatedItem : i)),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // Mark item unavailable
  markUnavailable: async (id) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: false }),
      });
      const updatedItem = await res.json();
      set((state) => ({
        inventory: state.inventory.map((i) => (i.id === id ? updatedItem : i)),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
