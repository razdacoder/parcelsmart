import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: Shipment;
};

export default function useShipmentDetail({ id }: { id?: string }) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!id,
    queryKey: ["shipment", id],
    queryFn: async () => {
      const response = await client.get(`/shipments/${id}`);
      return response.data;
    },
  });
}
