import { create } from "zustand";

type NewItemModalState = {
  parcel_id?: number;
  item_id?: number;
  isOpen: boolean;
  onOpen: (parcel_id: number, item_id: number) => void;
  onClose: () => void;
};

export const useEditItemModal = create<NewItemModalState>((set) => ({
  parcel_id: undefined,
  isOpen: false,
  onOpen: (parcel_id: number, item_id: number) =>
    set({ isOpen: true, parcel_id, item_id }),
  onClose: () =>
    set({ isOpen: false, parcel_id: undefined, item_id: undefined }),
}));
