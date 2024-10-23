import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResquestType = {
  shipment_id: string;
  rate_id: string;
  dropoff_id?: string;
  purchase_insurance: boolean;
};

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    user_id: string;
    shipment_amount: string;
    reference: string;
    status: string;
    platform: string;
    shipment_id: string;
    rate_id: string;
    type: string;
    dropoff_id: string;
    insurance_amount: number;
    amount: number;
    purchase_insurance: boolean;
    id: string;
    updated_at: Date;
    created_at: Date;
  };
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
