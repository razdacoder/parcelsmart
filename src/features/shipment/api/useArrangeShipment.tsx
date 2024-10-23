import useMe from "@/features/auth/api/useMe";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePaystackPayment } from "react-paystack";
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
  const { data: user } = useMe();

  const config = {
    reference: "",
    email: "",
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);
  const onSuccess = (reference: string) => {
    // Call your payment verification API
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

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
        config.amount = data.data.amount * 100;
        config.email = (user && user?.data.email) || "";
        config.reference = data.data.reference;
        initializePayment({ onSuccess, onClose, config });
      },
    }
  );
}
