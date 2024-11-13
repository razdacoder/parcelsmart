import { useAuth } from "@/components/auth-provider";
import { client } from "@/lib/client";
import { UpdatePasswordValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResponseType = {
  status: boolean;
  message: string;
};

export default function useChangePassword() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    UpdatePasswordValues
  >({
    mutationFn: async (data) => {
      const response = await client.post("/users/password", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      logout();
      queryClient.clear();
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
      console.error(error);
    },
  });
}
