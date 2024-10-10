import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: Wallet[];
};

export default function useWallet() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const response = await client.get("/wallets");
      return response.data;
    },
  });
}
