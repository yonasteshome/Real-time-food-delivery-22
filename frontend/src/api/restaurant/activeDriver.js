import axios from "axios";

export const fetchActiveDrivers = async (restaurantId) => {
  try {
    const res = await axios.get(
      `https://real-time-food-delivery.onrender.com/api/delivery/restaurants/${restaurantId}/active-drivers`,
      { withCredentials: true }
    );
    return res.data.drivers || [];
  } catch (err) {
    console.error("Error fetching active drivers:", err);
    throw new Error("Failed to load active drivers");
  }
};
