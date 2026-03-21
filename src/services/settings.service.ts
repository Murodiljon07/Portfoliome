import api from "@/api/axios";

import {
  Profile,
  ChangePasswordPayload,
  UpdateProfilePayload,
} from "@/interface/types/settings.type";

export const settingsService = {
  // GET PROFILE
  getProfile: async (): Promise<Profile> => {
    const { data } = await api.get("/accounts/profile/");
    return data;
  },

  // UPDATE PROFILE
  updateProfile: async (payload: UpdateProfilePayload): Promise<Profile> => {
    const { data } = await api.put("/accounts/profile/", payload);
    return data;
  },

  // CHANGE PASSWORD
  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await api.post("/accounts/change-password/", payload);
  },
};
