import { create } from "zustand";

type UpdatePasswordModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUpdatePasswordModal = create<UpdatePasswordModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
