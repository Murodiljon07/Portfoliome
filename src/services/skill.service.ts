import api from "@/api/axios";
import { Skill, SkillListResponse } from "@/interface/types/skill.types";

export const skillService = {
  getAll: async (): Promise<SkillListResponse> => {
    const res = await api.get("/api/skills/");
    return res.data;
  },

  getById: async (id: number): Promise<Skill> => {
    const res = await api.get(`/api/skills/${id}/`);
    return res.data;
  },

  create: async (data: FormData): Promise<Skill> => {
    const res = await api.post("/api/skills/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: number, data: FormData): Promise<Skill> => {
    const res = await api.put(`/api/skills/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/api/skills/${id}/`);
  },
};
