import axios from "axios";

const api = axios.create({
  baseURL: "https://delivery-backend-jtub.onrender.com/api/delivery/restaurants",
  withCredentials: true,
});

export default api;
