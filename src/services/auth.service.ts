import api from "@/api/axios";
import { STORAGE_KEYS } from "@/interface/constants";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  access: string;
  refresh: string;
};

export const authService = {
  async login(data: LoginPayload) {
    const res = await api.post<LoginResponse>("/accounts/login/", data);

    // tokenni saqlash
    localStorage.setItem(STORAGE_KEYS.TOKEN, res.data.access);

    return res.data;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
