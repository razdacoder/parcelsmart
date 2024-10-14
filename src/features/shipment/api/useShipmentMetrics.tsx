import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    total_shipments: number;
    draft_shipments: number;
    confirmed_shipments: number;
    delivered_shipments: number;
    cancelled_shipments: number;
    in_transit_shipments: number;
  };
};

export default function useShipmentMetrics() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["shipment-metrics"],
    queryFn: async () => {
      const response = await client.get("/shipments/metrics/statistics");
      return response.data;
    },
  });
}
