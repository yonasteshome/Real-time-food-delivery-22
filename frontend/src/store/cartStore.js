import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (item) => {
    const cartItems = get().cartItems;
    const index = cartItems.findIndex((i) => i._id === item._id);
    if (index > -1) {
      const updated = [...cartItems];
      updated[index].quantity += 1;
      set({ cartItems: updated });
    } else {
      set({ cartItems: [...cartItems, { ...item, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    set({
      cartItems: get().cartItems.filter((item) => item._id !== id),
    });
  },

  clearCart: () => set({ cartItems: [] }),

  updateQuantity: (id, quantity) => {
    const cartItems = get().cartItems.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );
    set({ cartItems });
  },

  getTotalQuantity: () =>
    get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

  getTotalPrice: () =>
    get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
