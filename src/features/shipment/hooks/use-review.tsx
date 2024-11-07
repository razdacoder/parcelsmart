import { create } from "zustand";

type NewReviewState = {
  shipment_id?: string;
  isOpen: boolean;
  onOpen: (shipment_id: string) => void;
  onClose: () => void;
};

export const useNewReview = create<NewReviewState>((set) => ({
  parcel_id: undefined,
  isOpen: false,
  onOpen: (shipment_id: string) => set({ isOpen: true, shipment_id }),
  onClose: () => set({ isOpen: false, shipment_id: undefined }),
}));
