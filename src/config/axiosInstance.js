import axios from "axios";
import { API_BASE_URL } from "./environment";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 Request Interceptor (Token attach karne ke liye)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ya cookies se lo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Response Interceptor (Error handle)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // server error
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
