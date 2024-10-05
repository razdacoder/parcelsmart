import { create } from "zustand";

type EditAddresState = {
  address?: AddressBook;
  isOpen: boolean;
  onOpen: (address: AddressBook) => void;
  onClose: () => void;
};

export const useEditAddress = create<EditAddresState>((set) => ({
  address: undefined,
  isOpen: false,
  onOpen: (address: AddressBook) => set({ address, isOpen: true }),
  onClose: () => set({ isOpen: false, address: undefined }),
}));
