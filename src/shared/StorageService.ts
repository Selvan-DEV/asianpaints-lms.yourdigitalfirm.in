import { AuthResponse, User } from "@/models/auth/UserModel";

// Function to check if sessionStorage is available
const isSessionStorageAvailable = () => {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
};

export const getSessionStorageItem = (itemName: string): unknown => {
  if (!isSessionStorageAvailable()) {
    return null;
  }

  const sessionItem = localStorage.getItem(itemName);
  if (!sessionItem || sessionItem === "undefined") {
    return null;
  }

  return JSON.parse(sessionItem);
};

export const getUserToken = (): string => {
  return (getSessionStorageItem("auth-storage") as { state: AuthResponse })?.state.token || "";
};

export const getUserData = (): User | null => {
  return (getSessionStorageItem("auth-storage") as { state: AuthResponse })?.state.user || null;
};
