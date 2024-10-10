import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: Transaction;
};

export default function useTransactionDetail({ id }: { id?: string }) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!id,
    queryKey: ["transaction", id],
    queryFn: async () => {
      const response = await client.get(`/transactions/${id}`);
      return response.data;
    },
  });
}
