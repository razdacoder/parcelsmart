import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type RequestType = {
  shipment_id: string;
};

export type TrackShipmentResponseType = {
  status: boolean;
  message: string;
  data: {
    id: string;
    tracking_number: string;
    status: "draft" | "confirmed" | "in_transit" | "delivered" | "cancelled";
    tracking_events: {
      date: Date;
      status:
        | "completed"
        | "confirmed"
        | "in-transit"
        | "delivered"
        | "cancelled";
      location: string;
      description: string;
    }[];

    origin_address: AddressBook;
    destination_address: AddressBook;
    return_address: AddressBook;
    parcel: {
      id: string;
      parcel_items: {
        id: string;
        name: string;
        value: number;
        weight: number;
        hs_code: number;
        currency: string;
        quantity: number;
        parcel_id: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date;
        description: string;
      }[];
      total_weight: number;
    };
  };
};

export default function useTrackShipment() {
  return useMutation<
    TrackShipmentResponseType,
    AxiosError<ErrorResponseType>,
    RequestType
  >({
    mutationKey: ["track-shipment"],
    mutationFn: async (data) => {
      const response = await client.post("/shipments/shipping/track", data);
      return response.data;
    },
  });
}
