import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export default function useResendEmailVerification() {
  return useMutation<
    {
      status: boolean;
      message: string;
    },
    AxiosError,
    { email: string }
  >({
    mutationFn: async (data) => {
      const response = await client.post("/auth/verification/resend", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}
