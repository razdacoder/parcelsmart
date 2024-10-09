import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: ShipmentRate[];
};

export default function useGetRates({ shipment_id }: { shipment_id?: string }) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!shipment_id,
    queryKey: ["rates", shipment_id],
    queryFn: async () => {
      const response = await client.get(`rates/shipping/${shipment_id}`);
      return response.data;
    },
  });
}
