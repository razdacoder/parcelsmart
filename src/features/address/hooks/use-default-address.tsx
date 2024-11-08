import { create } from "zustand";

type DefaultModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDefaultAddress = create<DefaultModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
