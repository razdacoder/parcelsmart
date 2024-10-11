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
  start_date,
  end_date,
}: {
  page?: number;
  limit?: number;
  type: string | null;
  start_date?: string;
  end_date?: string;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["transactions", page, limit, type, start_date, end_date],
    queryFn: async () => {
      const response = await client.get("/transactions", {
        params: { page, limit, type, start_date, end_date },
      });
      return response.data;
    },
  });
}
