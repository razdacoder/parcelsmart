import { create } from "zustand";

type UpdateProfileModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUpdateProfileModal = create<UpdateProfileModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
