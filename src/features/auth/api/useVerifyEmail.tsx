import { useAuth } from "@/components/auth-provider";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useVerifyEmail() {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation<
    AuthSuccessType,
    AxiosError<ErrorResponseType>,
    { email: string; otp: string }
  >({
    mutationFn: async (data) => {
      const response = await client.post("/auth/verification/verify", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      login({
        token: data.data.access_token,
        expires_at: data.data.expires_at,
      });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message);
    },
  });
}
