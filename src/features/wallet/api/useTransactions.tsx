import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: Pagination;
  };
};

export default function useTransactions({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await client.get("/transactions", {
        params: { page, limit },
      });
      return response.data;
    },
  });
}
