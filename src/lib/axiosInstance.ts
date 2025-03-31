import { useAuthStore } from "@/store/useAuthStore";
import showErrorToast from "@/utils/displayErrorMessage";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token from Zustand
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Get token from Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here
    if (error) {
      showErrorToast(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
