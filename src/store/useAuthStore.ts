import { create } from "zustand";
import Cookies from "js-cookie";
interface User {
  id: number;
  name: string;
}

interface AuthStore {
  token: string | null;
  userInfo: User | null;
  isAuthanticated: boolean;
  setUserInfo: (userInfo: User) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const initialToken = Cookies.get("token");

export const useAuthStore = create<AuthStore>((set) => ({
  token: initialToken || null,
  userInfo: null,
  isAuthanticated: initialToken ? true : false,
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  setToken: (token) =>
    set(() => {
      Cookies.set("token", token, {
        secure: true,
        sameSite: "strict",
        expires: 1, // 1 day
      });
      return { token, isAuthanticated: true };
    }),
  clearToken: () =>
    set(() => {
      Cookies.remove("token");
      return { token: null, isAuthanticated: false };
    }),
}));
