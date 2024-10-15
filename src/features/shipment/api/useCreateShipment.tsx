import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ShipmentRequestType = {
  origin_address_id: string;
  destination_address_id: string;
  parcel_ids: string[];
  purpose: string;
};

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    origin_address_id: string;
    destination_address_id: string;
    parcel_id: string;
    purpose: string;
    user_id: string;
    status: string; // Change to Correct Type
    return_address_id: string;
    id: string;
    updated_at: Date;
    created_at: Date;
    platform: string;
    platform_id: string;
  };
};

export default function useCreateShipment() {
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    ShipmentRequestType
  >({
    mutationFn: async (data) => {
      const response = await client.post("/shipments", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
}
