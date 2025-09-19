// src/api/menuApi.js
const BASE_URL = "https://delivery-backend-jtub.onrender.com/api/delivery/restaurants";

export const fetchMenuByRestaurantId = async (restaurantId) => {
  const response = await fetch(`${BASE_URL}/${restaurantId}`, {
    method: "GET",
    credentials: "include", // sends HttpOnly cookie automatically
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Unauthorized. Please login.");
    throw new Error("Failed to fetch restaurant menu");
  }

  return response.json();
};
