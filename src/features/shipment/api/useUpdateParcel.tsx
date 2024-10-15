import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ParcelRequestType } from "./useCreateParcel";

type ResponseType = {
  status: boolean;
  message: string;
  data: Parcel;
};

export default function useUpdateParcel() {
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    { id: string; values: ParcelRequestType }
  >({
    mutationFn: async ({ id, values }) => {
      const response = await client.put(`/parcels/${id}`, values);
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
