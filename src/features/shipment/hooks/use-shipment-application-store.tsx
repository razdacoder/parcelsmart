import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ShipmentApplicationState = {
  sender?: AddressBook;
  receiver?: AddressBook;
  setSenderValues: (values: AddressBook) => void;
  setReceiverValues: (values: AddressBook) => void;
  clearSenderValues: () => void;
  clearReceiverValues: () => void;
  clearAll: () => void;
};

export const useShipmentApplication = create(
  persist<ShipmentApplicationState>(
    (set) => ({
      sender: undefined,
      reciever: undefined,
      setSenderValues: (values: AddressBook) => set({ sender: values }),
      setReceiverValues: (values: AddressBook) => set({ receiver: values }),
      clearSenderValues: () => set({ sender: undefined }),
      clearReceiverValues: () => set({ receiver: undefined }),
      clearAll: () => set({ sender: undefined, receiver: undefined }),
    }),
    {
      name: "shipment-application",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
