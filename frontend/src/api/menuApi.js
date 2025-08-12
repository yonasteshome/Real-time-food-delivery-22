export const fetchMenuByRestaurantId = async (restaurantId) => {
  const response = await fetch(`http://localhost:5000/api/delivery/restaurants/${restaurantId}`);
  if (!response.ok) throw new Error("Failed to fetch restaurant menu");
  return response.json();
};



