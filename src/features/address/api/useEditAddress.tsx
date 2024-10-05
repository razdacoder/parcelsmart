import { client } from "@/lib/client";
import { AddressValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AddressResponseType } from "./useCreateAddress";

export default function useEditAddress({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  return useMutation<
    AddressResponseType,
    AxiosError<ErrorResponseType>,
    AddressValues
  >({
    mutationFn: async (data) => {
      const response = await client.put(`/addresses/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address", id] });
      toast.success("Address Updated");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
