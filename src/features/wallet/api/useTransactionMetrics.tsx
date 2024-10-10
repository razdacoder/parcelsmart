import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    credit: number;
    debit: number;
  };
};

export default function useTransactionMetrics() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["transaction-metrics"],
    queryFn: async () => {
      const response = await client.get("/transactions/metrics/statistics");
      return response.data;
    },
  });
}
