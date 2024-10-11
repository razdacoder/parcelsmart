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
  search,
}: {
  page?: number;
  limit?: number;
  type: string | null;
  start_date?: string;
  end_date?: string;
  search: string;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["transactions", page, limit, type, start_date, end_date, search],
    queryFn: async () => {
      const response = await client.get("/transactions", {
        params: {
          page,
          limit,
          type,
          start_date,
          end_date,
          search: search === "" ? undefined : search,
        },
      });
      return response.data;
    },
  });
}
