import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: Review[];
};

export default function useGetReview({
  shipment_id,
}: {
  shipment_id?: string;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!shipment_id,
    queryKey: ["review", shipment_id],
    queryFn: async () => {
      const response = await client.get(`shipments/${shipment_id}/review`);
      return response.data;
    },
  });
}
