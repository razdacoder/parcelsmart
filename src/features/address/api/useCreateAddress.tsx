import { client } from "@/lib/client";
import { AddressValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResponseType = {
  status: boolean;
  message: string;
  data: AddressBook;
};

export default function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    AddressValues
  >({
    mutationFn: async (data) => {
      const response = await client.post("/addresses", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address-list", 1] });
      toast.success("Address Created");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
