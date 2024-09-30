import { create } from "zustand";

type DropOffState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDropOff = create<DropOffState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
