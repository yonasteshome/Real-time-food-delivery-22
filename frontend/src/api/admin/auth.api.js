import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://real-time-food-delivery.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HttpOnly cookies
});


export default api;
