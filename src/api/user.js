import axios from "axios";

export const fetchUserInfoAPI = async () => {
  try {
    const res = await axios.get(
      "https://real-time-food-delivery.onrender.com/api/delivery/users/info",
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  } catch (err) {
    console.error(
      "Fetch User Info Error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};
