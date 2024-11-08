import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type RequestType = {
  address_id: string;
};

type ResponseType = {
  status: boolean;
  message: string;
  data: AddressBook;
};

export default function useSetDefaultAddress() {
  return useMutation<ResponseType, AxiosError<ErrorResponseType>, RequestType>({
    mutationFn: async ({ address_id }) => {
      const response = await client.post(`/addresses/${address_id}/default`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data.message);
    },
  });
}
