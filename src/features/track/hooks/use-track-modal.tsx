import { create } from "zustand";

type TrackModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useTrackModal = create<TrackModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
