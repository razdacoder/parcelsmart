import {ItemValues, ParcelValues} from "@/lib/schemas";
import {create} from "zustand";

type Carrier = {
  name: string;
  logo: string;
  slug: string
  rate: number;
};

type Insurance = {
  id: string;
  name: string;
  price: number;
};

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
  setItems: (parcel_index: number, values: ItemValues[]) => void;
  deleteParcel: (parcel_index: number) => void;
  updateParcel: (
    parcel_index: number,
    packaging?: { id: string; value: string },
    currency?: "NGN" | "USD" | "GBP"
  ) => void;
  setParcels: (data: ParcelValues[]) => void;
  addProofOfPayment: (parcel_index: number, value: string) => void;
  deleteProofOfPayment: (parcel_index: number, item_index: number) => void;
  addProofOfWeight: (parcel_index: number, value: string) => void;
  deleteProofOfWeight: (parcel_index: number, item_index: number) => void;
  parcels_id: string[];
  addParcelId: (value: string) => void;
  deleteParcelId: (value: string) => void;
  setNewIDS: (values: string[]) => void;
  shipmentID?: string;
  setShipmentID: (value: string) => void;
  rate_id?: string;
  setRateID: (value: string) => void;
  drop_off_id?: string;
  setDropOffId: (value: string) => void;
  carrier?: Carrier;
  setCarrier: (value: Carrier) => void;
  insurance?: Insurance;
  location?: string;
  setLocation: (value: string) => void;
  setInsurance: (value?: Insurance) => void;
  useInsurance: boolean;
  setUseInsurance: (value: boolean) => void;
};

export const useShipmentApplication = create<ShipmentApplicationState>(
  (set) => ({
    // Address
    sender: undefined,
    receiver: undefined,
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
    setParcels: (data: ParcelValues[]) => set({ parcels: data }),
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
          updatedParcel.items = updatedParcel.items.filter(
            (_, index) => index !== item_index
        );
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    setItems: (parcel_index: number, values: ItemValues[]) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
        updatedParcel.items = values;
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
      packaging?: { id: string; value: string },
      currency?: "NGN" | "USD" | "GBP"
    ) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };

        // Update the parcel's fields if the new value is provided
        if (packaging !== undefined) {
          updatedParcel.packaging = packaging.id;
          updatedParcel.packaging_value = packaging.value;
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
          updatedParcel.proofOfPayment = updatedParcel.proofOfPayment.filter(
            (_, index) => index !== item_index
        );
        updatedParcels[parcel_index] = updatedParcel;
        return { parcels: updatedParcels };
      }),
    deleteProofOfWeight: (parcel_index: number, item_index: number) =>
      set((state) => {
        const updatedParcels = [...state.parcels];
        const updatedParcel = { ...updatedParcels[parcel_index] };
          updatedParcel.proofOfWeight = updatedParcel.proofOfWeight.filter(
            (_, index) => index !== item_index
        );
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
    setNewIDS: (values: string[]) => set({ parcels_id: values }),
    shipmentID: undefined,
    setShipmentID: (value: string) => set({ shipmentID: value }),
    setRateID: (value: string) => set({ rate_id: value }),
    setDropOffId: (value: string) => set({ drop_off_id: value }),
    setLocation: (value: string) => set({ location: value }),
    setCarrier: (value: Carrier) => set({ carrier: value }),
    setInsurance: (value?: Insurance) => set({ insurance: value }),
    useInsurance: false,
    setUseInsurance: (value: boolean) => set({ useInsurance: value }),
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
        rate_id: undefined,
        drop_off_id: undefined,
        location: undefined,
        carrier: undefined,
        insurance: undefined,
        useInsurance: false,
      }),
  })
);
