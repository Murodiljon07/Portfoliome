import api from "@/api/axios";
import { About, AboutListResponse } from "@/interface/types/about.types";

export const aboutService = {
  getAll: async (): Promise<AboutListResponse> => {
    const res = await api.get("/api/about/");
    return res.data;
  },

  getById: async (id: number): Promise<About> => {
    const res = await api.get(`/api/about/${id}/`);
    return res.data;
  },

  create: async (data: FormData): Promise<About> => {
    const res = await api.post("/api/about/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: number, data: FormData): Promise<About> => {
    const res = await api.put(`/api/about/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/api/about/${id}/`);
  },
};
