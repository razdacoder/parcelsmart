import { create } from "zustand";

type DropOffState = {
  isOpen: boolean;
  required?: boolean;
  onOpen: (drop_required: boolean, carrier: string) => void;
  carrier?: string;
  onClose: () => void;
};

export const useDropOff = create<DropOffState>((set) => ({
  isOpen: false,
  onOpen: (drop_required: boolean, carrier: string) =>
    set({ isOpen: true, required: drop_required, carrier }),
  onClose: () => set({ isOpen: false }),
}));
