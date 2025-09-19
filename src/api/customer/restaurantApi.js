// src/api/restaurantApi.js
export const fetchNearbyRestaurants = async (lat, lng) => {
  const url = lat && lng
    ? `https://delivery-backend-1-lfew.onrender.com/api/delivery/restaurants?lat=${lat}&lng=${lng}`
    : "https://delivery-backend-1-lfew.onrender.com/api/delivery/restaurants";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // ✅ send HttpOnly cookie automatically
  });

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return await response.json();
};
