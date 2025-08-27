import { create } from "zustand";
import {
  fetchCart,
  addCartItem,
  updateCartItemQty,
  removeCartItem,
  clearCartByRestaurant,
} from "../../api/customer/cartApi";

const useCartStore = create((set, get) => ({
  cartItems: [],
  restaurantId: null,
  loading: false,
  error: null,

  loadCart: async () => {
    set({ loading: true });
    try {
      const data = await fetchCart();
      set({
        cartItems: data.data.items || [],
        restaurantId: data.data.restaurantId,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addToCart: async (item, restaurantId) => {
    try {
      const res = await addCartItem(item, restaurantId);
      set({
        cartItems: res.data.items || [],
        restaurantId: res.data.restaurantId,
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      const res = await updateCartItemQty(id, quantity);
      set({
        cartItems: res.data.items || [],
        restaurantId: res.data.restaurantId,
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  removeFromCart: async (id) => {
    try {
      const res = await removeCartItem(id);
      set({
        cartItems: res.data.items || [],
        restaurantId: res.data.restaurantId,
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  clearCart: async () => {
    const restaurantId = get().restaurantId;
    if (!restaurantId) return;

    try {
      const res = await clearCartByRestaurant(restaurantId);
      set({
        cartItems: res.data.items || [],
        restaurantId: res.data.restaurantId,
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  getTotalQuantity: () =>
    get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
  getTotalPrice: () =>
    get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
