import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation<
    { status: boolean; message: string },
    AxiosError<ErrorResponseType>,
    { id: string }
  >({
    mutationFn: async ({ id }) => {
      const response = await client.delete(`/addresses/${id}`);
      return response.data;
    },
    onSuccess: (data, varibles) => {
      queryClient.invalidateQueries({ queryKey: ["address", varibles.id] });
      queryClient.invalidateQueries({ queryKey: ["address-list", 1] });
      toast.success(data.message);
    },
  });
}
