import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    premium: number;
    currency: string;
    shipment_currency: string;
    converted_premium: number;
  };
};

export default function useGetInsurance({
  shipment_id,
}: {
  shipment_id?: string;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!shipment_id,
    queryKey: ["insurance"],
    queryFn: async () => {
      const response = await client.post("/insurance/premium", { shipment_id });
      return response.data;
    },
  });
}
