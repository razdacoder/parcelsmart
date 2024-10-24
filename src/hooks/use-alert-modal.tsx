import { create } from "zustand";

type OpenProps = {
  type: "warning" | "success" | "error";
  title: string;
  message: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryFn: () => void;
  secondaryFn: () => void;
};

type AlertModalState = {
  isOpen: boolean;
  type?: "warning" | "success" | "error";
  title?: string;
  message?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryFn?: () => void;
  secondaryFn?: () => void;
  onOpen: (value: OpenProps) => void;
  onClose: () => void;
};

export const useAlertModal = create<AlertModalState>((set) => ({
  isOpen: false,
  onOpen: (value: OpenProps) =>
    set({
      type: value.type,
      title: value.title,
      message: value.message,
      primaryLabel: value.primaryLabel,
      secondaryLabel: value.secondaryLabel,
      primaryFn: value.primaryFn,
      secondaryFn: value.secondaryFn,
      isOpen: true,
    }),
  onClose: () =>
    set({
      type: undefined,
      title: undefined,
      message: undefined,
      primaryLabel: undefined,
      secondaryLabel: undefined,
      primaryFn: undefined,
      secondaryFn: undefined,
      isOpen: false,
    }),
}));
