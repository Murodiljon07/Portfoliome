import api from "@/api/axios";
import {
  Experience,
  ExperienceListResponse,
} from "@/interface/types/experience.types";

export const experienceService = {
  getAll: async (): Promise<ExperienceListResponse> => {
    const res = await api.get("/api/experiences/");
    return res.data;
  },

  getById: async (id: number): Promise<Experience> => {
    const res = await api.get(`/api/experiences/${id}/`);
    return res.data;
  },

  create: async (data: Experience): Promise<Experience> => {
    const res = await api.post("/api/experiences/", data);
    return res.data;
  },

  update: async (id: number, data: Experience): Promise<Experience> => {
    const res = await api.put(`/api/experiences/${id}/`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/api/experiences/${id}/`);
  },
};
