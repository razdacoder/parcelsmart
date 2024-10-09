import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export type ParcelRequestType = {
  description: string;
  packaging_id: string;
  weight_unit: string;
  items: {
    description: string;
    name: string;
    currency: string;
    value: number;
    quantity: number;
    weight: number;
    hs_code: string;
  }[];
};

type ResponseType = {
  status: boolean;
  message: string;
  data: Parcel;
};

export default function useCreateParcel() {
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    ParcelRequestType
  >({
    mutationFn: async (data) => {
      const response = await client.post("/parcels", data);
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
