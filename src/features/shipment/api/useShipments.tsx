import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    shipments: Shipment[];
    pagination: Pagination;
  };
};

export default function useShipments({
  page,
  limit,
  status,
  start_date,
  end_date,
  search,
}: {
  page?: number;
  limit?: number;
  status:
    | "draft"
    | "confirmed"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | null;
  start_date?: string;
  end_date?: string;
  search: string;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["shipments", page, limit, status, start_date, end_date, search],
    queryFn: async () => {
      const response = await client.get("/shipments", {
        params: {
          page,
          limit,
          status,
          start_date,
          end_date,
          search: search === "" ? undefined : search,
        },
      });
      return response.data;
    },
  });
}
