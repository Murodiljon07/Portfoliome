import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "@/interface/types/modal.types";

type ModalState = {
  isOpen: boolean;
  type: ModalType | null;
  payload: any;
};

const initialState: ModalState = {
  isOpen: false,
  type: null,
  payload: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; payload?: any }>,
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.payload = action.payload.payload || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.payload = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
