// API functions for driver orders
import axios from "axios";

export const fetchDriverOrdersAPI = async (driverId) => {
  try {
    const res = await axios.get(
      `https://delivery-backend-jtub.onrender.com/api/delivery/drivers/${driverId}/orders`,
      { withCredentials: true }
    );
    return res.data.data; // { driver, orders }
  } catch (err) {
    console.error(
      "Fetch Driver Orders Error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

export const fetchDriverEarningsAPI = async (driverId) => {
  try {
    const res = await axios.get(
      `https://delivery-backend-jtub.onrender.com/api/delivery/drivers/${driverId}/earnings`,
      { withCredentials: true }
    );
    return res.data.data;
  } catch (err) {
    console.error(
      "Fetch Driver Earnings Error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

export const updateDriverStatusAPI = async (status) => {
  try {
    const res = await axios.patch(
      `https://delivery-backend-jtub.onrender.com/api/delivery/drivers/status`,
      { status },
      { withCredentials: true }
    );
    return res.data.data.driver;
  } catch (err) {
    console.error(
      "Update Driver Status Error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

export const updateOrderStatusAPI = async (orderId, status) => {
  try {
    await axios.post(
      `https://delivery-backend-jtub.onrender.com/api/delivery/orders/${orderId}/status`,
      { status },
      { withCredentials: true }
    );
  } catch (err) {
    console.error(
      "Update Order Status Error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};
