import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// import { env } from "@/env";
import { STORAGE_KEYS } from "@/interface/constants";

const api: AxiosInstance = axios.create({
  baseURL: "https://cemare5406.pythonanywhere.com/",
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
