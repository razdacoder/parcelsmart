import useMe from "@/features/auth/api/useMe";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useReviewMode } from "../hooks/use-review-mode";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

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
  const { onOpen, onClose: alertClose } = useAlertModal();
  const navigate = useNavigate();
  const { clearAll } = useShipmentApplication();
  const { setReviewMode } = useReviewMode();

  const config = {
    reference: "",
    email: "",
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);
  const onSuccess = (reference: string) => {
    console.log(reference);
    onOpen({
      type: "success",
      title: "Success",
      message: "Congratulations! Your shipemnt has been arranged successfully",
      primaryLabel: "Track Shipment",
      secondaryLabel: "Back to Home",
      primaryFn: () => {
        clearAll();
        navigate("/track");
        setReviewMode(false);
        alertClose();
      },
      secondaryFn: () => {
        clearAll();
        navigate("/");
        setReviewMode(false);
        alertClose();
      },
    });
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
        onOpen({
          type: "error",
          title: "Error",
          message: error.response?.data.message || "",
          primaryLabel: "Retry",
          secondaryLabel: "Cancel",
          primaryFn: () => {
            alertClose();
          },
          secondaryFn: () => {
            alertClose();
          },
        });
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
