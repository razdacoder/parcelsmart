import { create } from "zustand";

type ReviewModeState = {
  reviewMode: boolean;
  setReviewMode: (value: boolean) => void;
};

export const useReviewMode = create<ReviewModeState>((set) => ({
  reviewMode: false,
  setReviewMode: (value: boolean) => set({ reviewMode: value }),
}));
