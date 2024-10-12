import { ItemValues, ParcelValues } from "@/lib/schemas";
import { create } from "zustand";

type ShipmentApplicationState = {
  sender?: AddressBook;
  receiver?: AddressBook;
  setSenderValues: (values: AddressBook) => void;
  setReceiverValues: (values: AddressBook) => void;
  clearSenderValues: () => void;
  clearReceiverValues: () => void;
  clearAll: () => void;
  parcels: ParcelValues[];
  newParcel: () => void;
  addItem: (parcel_index: number, values: ItemValues) => void;
  editItem: (
    parcel_index: number,
    item_index: number,
    values: ItemValues
  ) => void;
  deleteItem: (parcel_index: number, item_index: number) => void;
  deleteParcel: (parcel_index: number) => void;
  updateParcel: (
    parcel_index: number,
    packaging?: string,
    currency?: "NGN" | "USD" | "GBP"
  ) => void;
  addProofOfPayment: (parcel_index: number, value: string) => void;
  deleteProofOfPayment: (parcel_index: number, item_index: number) => void;
  addProofOfWeight: (parcel_index: number, value: string) => void;
  deleteProofOfWeight: (parcel_index: number, item_index: number) => void;
  parcels_id: string[];
  addParcelId: (value: string) => void;
  deleteParcelId: (value: string) => void;
  shipmentID?: string;
  setShipmentID: (value: string) => void;
  rate_id?: string;
  setRateID: (value: string) => void;
  drop_off_id?: string;
  setDropOffId: (value: string) => void;
};

export const useShipmentApplication = create<ShipmentApplicationState>(
  (set) => ({
    // Address
    sender: undefined,
    reciever: undefined,
    setSenderValues: (values: AddressBook) => set({ sender: values }),
    setReceiverValues: (values: AddressBook) => set({ receiver: values }),
    clearSenderValues: () => set({ sender: undefined }),
    clearReceiverValues: () => set({ receiver: undefined }),

    //Parcel
    parcels: [
      {
        packaging: "",
        currency: "NGN",
        items: [],
        proofOfPayment: [],
        proofOfWeight: [],
      },
    ],
    newParcel: () =>
      set((state) => ({
        parcels: [
          ...state.parcels,
          {
            packaging: "",
            currency: "NGN",
            items: [],
            proofOfPayment: [],
            proofOfWeight: [],
          },
        ],
      })),
    addItem: (parcel_index: number, values: ItemValues) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        updatedParcel.items = [...updatedParcel.items, values];
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    editItem: (parcel_index: number, item_index: number, values: ItemValues) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        const updatedItems = [...updatedParcel.items];
        updatedItems[item_index] = { ...updatedItems[item_index], ...values };
        updatedParcel.items = updatedItems;
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    deleteItem: (parcel_index: number, item_index: number) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        const updatedItems = updatedParcel.items.filter(
          (_, index) => index !== item_index
        );
        updatedParcel.items = updatedItems;
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    deleteParcel: (parcel_index: number) =>
      set((state) => {
        const updatedParcels = state.parcels.filter(
          (_, index) => index !== parcel_index
        );
        return { parcels: updatedParcels };
      }),
    updateParcel: (
      parcel_index: number,
      packaging?: string,
      currency?: "NGN" | "USD" | "GBP"
    ) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };

        // Update the parcel's fields if the new value is provided
        if (packaging !== undefined) {
          updatedParcel.packaging = packaging;
        }
        if (currency !== undefined) {
          updatedParcel.currency = currency;
        }

        // Replace the updated parcel in the parcels array
        updatedParcels[parcel_index] = updatedParcel;

        // Return the updated parcels state
        return { parcels: updatedParcels };
      }),
    addProofOfPayment: (parcel_index: number, value: string) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        updatedParcel.proofOfPayment = [...updatedParcel.proofOfPayment, value];
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    addProofOfWeight: (parcel_index: number, value: string) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        updatedParcel.proofOfWeight = [...updatedParcel.proofOfWeight, value];
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    deleteProofOfPayment: (parcel_index: number, item_index: number) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        const updatedItems = updatedParcel.proofOfPayment.filter(
          (_, index) => index !== item_index
        );
        updatedParcel.proofOfPayment = updatedItems;
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    deleteProofOfWeight: (parcel_index: number, item_index: number) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        const updatedItems = updatedParcel.proofOfWeight.filter(
          (_, index) => index !== item_index
        );
        updatedParcel.proofOfWeight = updatedItems;
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),

    parcels_id: [],
    addParcelId: (value) =>
      set((state) => {
        const updatedParcelIds = [...state.parcels_id, value];
        return { parcels_id: updatedParcelIds };
      }),
    deleteParcelId: (value) =>
      set((state) => {
        const parcelIds = [...state.parcels_id];
        const updatedParcelIds = parcelIds.filter((id) => id !== value);
        return { parcels_id: updatedParcelIds };
      }),
    shipmentID: undefined,
    setShipmentID: (value: string) => set({ shipmentID: value }),
    setRateID: (value: string) => set({ rate_id: value }),
    setDropOffId: (value: string) => set({ rate_id: value }),
    clearAll: () =>
      set({
        sender: undefined,
        receiver: undefined,
        parcels: [
          {
            packaging: "",
            currency: "NGN",
            items: [],
            proofOfPayment: [],
            proofOfWeight: [],
          },
        ],
        parcels_id: [],
        shipmentID: undefined,
      }),
  })
);
