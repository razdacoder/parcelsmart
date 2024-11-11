import { useAuth } from "@/components/auth-provider";
import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResponseType = {
  status: boolean;
  message: string;
};

export default function useDeleteAccount() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<ResponseType, AxiosError<ErrorResponseType>>({
    mutationFn: async () => {
      const response = await client.delete("/users");
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      logout();
      queryClient.clear();
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
}
