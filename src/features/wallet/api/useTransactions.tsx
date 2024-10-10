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
  type,
}: {
  page?: number;
  limit?: number;
  type: string | null;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["transactions", page, limit, type],
    queryFn: async () => {
      const response = await client.get("/transactions", {
        params: { page, limit, type },
      });
      return response.data;
    },
  });
}
