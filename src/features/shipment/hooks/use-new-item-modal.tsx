import { create } from "zustand";

type NewItemModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewItemModal = create<NewItemModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
