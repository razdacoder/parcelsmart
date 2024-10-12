import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResquestType = {
  shipment_id: string;
  rate_id: string;
  dropoff_id?: string;
};

type ResponseType = {
  status: boolean;
  message: string;
  data: any;
};
export default function useArrangeShipment() {
  return useMutation<ResponseType, AxiosError<ErrorResponseType>, ResquestType>(
    {
      mutationFn: async (data) => {
        const response = await client.post("/shipments/shipping/arrange", data);
        return response.data;
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.response?.data.message);
      },
      onSuccess: (data) => {
        toast.success(data.message);
      },
    }
  );
}
