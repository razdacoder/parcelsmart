import { create } from "zustand";

type NewKYCState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useKycModal = create<NewKYCState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
