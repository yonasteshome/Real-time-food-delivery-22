import axios from "axios";

export const fetchDriverOrdersAPI = async (driverId) => {
  try {
    const res = await axios.get(
      `https://real-time-food-delivery.onrender.com/api/delivery/drivers/${driverId}/orders`,
      { withCredentials: true }
    );
    return res.data.data.orders || [];
  } catch (err) {
    console.error("Fetch Driver Orders Error:", err.response?.data?.message || err.message);
    throw err;
  }
};
