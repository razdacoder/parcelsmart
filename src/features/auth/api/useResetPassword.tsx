import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

type RequestType = {
  email: string;
  password: string;
  confirm_password: string;
  otp: string;
};

export default function useResetPassword() {
  const navigate = useNavigate();
  return useMutation<
    {
      status: boolean;
      message: string;
    },
    AxiosError<ErrorResponseType>,
    RequestType
  >({
    mutationFn: async (data) => {
      const response = await client.post("/auth/password/reset", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
