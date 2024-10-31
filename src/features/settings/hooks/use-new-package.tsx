import { create } from "zustand";

type NewPackageState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPackage = create<NewPackageState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
