import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { STORAGE_KEYS } from "@/interface/constants";

const api: AxiosInstance = axios.create({
  baseURL: "https://cemare5406.pythonanywhere.com/",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;
