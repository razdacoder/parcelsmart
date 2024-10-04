import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useRefreshToken() {
  return useMutation<{ access_token: string; expires_at: Date }, AxiosError>({
    mutationFn: async () => {
      const response = await client.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
}
