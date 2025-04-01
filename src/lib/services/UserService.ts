import { IForgotPasswordPayload, IUserRegistration } from "@/models/auth/UserModel";
import axiosInstance from "../axiosInstance";

export const registerUser = async (payload: IUserRegistration): Promise<number> => {
  try {
    const url = `users/register`;
    const response = await axiosInstance.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgorPassword = async (payload: IForgotPasswordPayload): Promise<{ message: string }> => {
  try {
    const url = `users/forgot-password`;
    const response = await axiosInstance.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
