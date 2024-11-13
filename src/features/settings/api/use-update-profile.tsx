import { client } from "@/lib/client";
import { UpdateProfileValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResponseType = {
  status: boolean;
  message: string;
};
export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    UpdateProfileValues
  >({
    mutationFn: async (data) => {
      const response = await client.patch("/users", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.error(error);
    },
  });
}
