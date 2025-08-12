// src/api/restaurantApi.js
export const fetchNearbyRestaurants = async (lat, lng) => {
  const url = lat && lng
    ? `http://localhost:5000/api/delivery/restaurants?lat=${lat}&lng=${lng}`
    : "http://localhost:5000/api/delivery/restaurants";

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch restaurants");

  return await response.json();
};
