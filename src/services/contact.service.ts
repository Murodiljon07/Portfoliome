import api from "@/api/axios";

export const contactService = {
  getAll: async () => {
    const res = await api.get("/api/contact/");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await api.get(`/api/contact/${id}/`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await api.post("/api/contact/", data);
    return res.data;
  },

  update: async (id: number, data: any) => {
    const res = await api.put(`/api/contact/${id}/`, data);
    return res.data;
  },

  remove: async (id: number) => {
    const res = await api.delete(`/api/contact/${id}/`);
    return res.data;
  },
};
