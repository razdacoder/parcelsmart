import { create } from "zustand";

type NewModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewAddress = create<NewModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
