/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/models/auth/UserModel";
import { create } from "zustand";
import { persist, PersistOptions, StorageValue } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

type AuthPersist = (
  config: (set: any, get: any) => AuthState,
  options: PersistOptions<AuthState>
) => (set: any, get: any, api: any) => AuthState;

export const useAuthStore = create<AuthState>(
  (persist as AuthPersist)(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name: string): StorageValue<AuthState> | null => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name: string, value: StorageValue<AuthState>) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
