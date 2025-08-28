const BASE_URL = "http://localhost:5000/api/delivery/customer/";

// Get cart
export const fetchCart = async () => {
  const res = await fetch(BASE_URL, { method: "GET", credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

// Add item to cart
export const addCartItem = async (item, restaurantId) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menuItemId: item._id, quantity: 1, restaurantId }),
  });
  if (!res.ok) throw new Error("Failed to add item to cart");
  return res.json();
};

// Update item quantity
export const updateCartItemQty = async (id, quantity) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
};

// Remove single item from cart
export const removeCartItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return res.json();
};

// Clear cart for a restaurant
export const clearCartByRestaurant = async (restaurantId) => {
  const res = await fetch(`${BASE_URL}/${restaurantId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to clear cart");
  // Return an empty cart structure since the backend deletes the cart
  return { data: { items: [], restaurantId: null } };
};
