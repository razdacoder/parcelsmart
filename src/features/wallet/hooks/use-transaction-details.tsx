import { create } from "zustand";

type TrasactionDetailState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useTransactionDetailModal = create<TrasactionDetailState>(
  (set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ id, isOpen: true }),
    onClose: () => set({ isOpen: false, id: undefined }),
  })
);
