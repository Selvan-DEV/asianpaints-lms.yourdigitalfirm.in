import { useAuthStore } from "@/store/useAuthStore";
import showErrorToast from "@/utils/displayErrorMessage";
import axios from "axios";
import { useUIStore } from "@/store/useUIStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token from Zustand
axiosInstance.interceptors.request.use(
  (config) => {
    useUIStore.getState().setLoading(true);
    const token = useAuthStore.getState().token; // Get token from Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, proxy-revalidate";
      config.headers["Pragma"] = "no-cache";
    }
    return config;
  },
  (error) => {
    useUIStore.getState().setLoading(false, 1000);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    useUIStore.getState().setLoading(false, 1000);
    return response;
  },
  (error) => {
    // Handle errors globally here
    if (error) {
      useUIStore.getState().setLoading(false, 1000);
      showErrorToast(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
