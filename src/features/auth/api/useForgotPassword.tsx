import { client } from "@/lib/client";
import { ResetPasswordValues } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export default function useForgotPassword() {
  const navigate = useNavigate();
  return useMutation<
    {
      status: boolean;
      message: string;
    },
    AxiosError<ErrorResponseType>,
    ResetPasswordValues
  >({
    mutationFn: async (data) => {
      const response = await client.post("/auth/password/forgot", data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.message);
      navigate("/auth/reset-password-confirm", {
        state: { email: variables.email },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
