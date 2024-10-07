import { AddressValues } from "@/lib/schemas";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ShipmentApplicationState = {
  sender?: AddressValues;
  receiver?: AddressValues;
  setSenderValues: (values: AddressValues) => void;
  setReceiverValues: (values: AddressValues) => void;
  clearSenderValues: () => void;
  clearReceiverValues: () => void;
};

export const useShipmentApplication = create(
  persist<ShipmentApplicationState>(
    (set) => ({
      sender: undefined,
      reciever: undefined,
      setSenderValues: (values: AddressValues) => set({ sender: values }),
      setReceiverValues: (values: AddressValues) => set({ receiver: values }),
      clearSenderValues: () => set({ sender: undefined }),
      clearReceiverValues: () => set({ receiver: undefined }),
    }),
    {
      name: "shipment-application",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
