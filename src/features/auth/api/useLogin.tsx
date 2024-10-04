import { useAuth } from "@/components/auth-provider";
import { client } from "@/lib/client";
import { LoginValues } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useResendEmailVerification from "./useResendEmailverification";

type LoginErrorType = {
  status: boolean;
  message: string;
  data?: {
    verify_email?: boolean;
  };
};

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate } = useResendEmailVerification();
  const { login } = useAuth();
  return useMutation<AuthSuccessType, AxiosError<LoginErrorType>, LoginValues>({
    mutationFn: async (data) => {
      const response = await client.post("/auth/login", data);
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
    onError: (error, variables) => {
      console.log(error);
      if (error.response?.data.data?.verify_email) {
        toast(error.response.data.message);
        mutate(
          { email: variables.email },
          {
            onSuccess: (_, variables) => {
              navigate("/auth/verify-email/verification", {
                state: {
                  email: variables.email,
                },
              });
            },
          }
        );
      }
      toast.error(error.response?.data.message || "Invalid email or password");
    },
  });
}
