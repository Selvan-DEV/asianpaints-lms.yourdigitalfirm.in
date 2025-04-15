import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("users/login", { email, password });

    if (response.data.token) {
      useAuthStore.getState().login(response.data.token, response.data.user);
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
