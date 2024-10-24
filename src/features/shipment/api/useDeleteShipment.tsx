import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useDeleteShipment() {
  return useMutation<
    {
      status: boolean;
      message: string;
    },
    AxiosError<ErrorResponseType>,
    { id: string }
  >({
    mutationFn: async ({ id }) => {
      const response = await client.delete(`/shipments/${id}`);
      return response.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message);
    },
  });
}
