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
  data: unknown;
};

export default function useUpdateShipment() {
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    { id: string; values: ShipmentRequestType }
  >({
    mutationFn: async ({ id, values }) => {
      const response = await client.put(`/shipments/${id}`, values);
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
