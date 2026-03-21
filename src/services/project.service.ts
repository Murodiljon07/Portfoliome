import api from "@/api/axios";
import { Project, ProjectListResponse } from "@/interface/types/projects.types";

export const projectService = {
  getAll: async (): Promise<ProjectListResponse> => {
    const res = await api.get("/api/projects/");
    return res.data;
  },

  getById: async (id: number): Promise<Project> => {
    const res = await api.get(`/api/projects/${id}/`);
    return res.data;
  },

  create: async (data: FormData): Promise<Project> => {
    const res = await api.post("/api/projects/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: number, data: FormData): Promise<Project> => {
    const res = await api.put(`/api/projects/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/api/projects/${id}/`);
  },
};
