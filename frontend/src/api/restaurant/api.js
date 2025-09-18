import axios from "axios";

const api = axios.create({
  baseURL: "https://real-time-food-delivery.onrender.com/api/delivery/restaurants",
  withCredentials: true,
});

export default api;
