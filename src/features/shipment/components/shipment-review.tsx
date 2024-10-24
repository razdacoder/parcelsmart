import { Button } from "@/components/ui/button";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { formatNaira } from "@/lib/utils";
import { Loader, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useArrangeShipment from "../api/useArrangeShipment";
import useDeleteShipment from "../api/useDeleteShipment";
import { useReviewMode } from "../hooks/use-review-mode";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function ShipmentReview() {
  const navigate = useNavigate();
  const {
    carrier,
    insurance,
    clearAll,
    shipmentID,
    rate_id,
    drop_off_id,
    useInsurance,
  } = useShipmentApplication();
  // const { data, isLoading, isRefetching, refetch } = useWallet();
  // const { onOpen } = useTopUpModal();
  const { setReviewMode } = useReviewMode();
  const { mutate: arrangeShipmentFn, isPending } = useArrangeShipment();

  // const { data, isLoading, isRefetching, refetch } = useWallet();
  // const { onOpen } = useTopUpModal();

  // const walletLoading = isLoading;
  const { onOpen, onClose } = useAlertModal();
  const { mutate } = useDeleteShipment();

  function arrangeShipment() {
    if (shipmentID && rate_id)
      arrangeShipmentFn({
        shipment_id: shipmentID,
        rate_id,
        dropoff_id: drop_off_id,
        purchase_insurance: useInsurance,
      });
  }
  return (
    <>
      <div className="bg-primary sticky h-screen top-0 right-0 w-full flex flex-col ">
        <div className="flex justify-end p-8">
          <button
            onClick={() => {
              onOpen({
                type: "warning",
                title: "Sure you want to cancel?",
                message:
                  "Your shipment will be discarded. Save as draft to keep your shipment information.",
                primaryLabel: "Cancel",
                secondaryLabel: "Save as draft",
                primaryFn: () => {
                  if (shipmentID) {
                    onClose();
                    mutate(
                      { id: shipmentID },
                      {
                        onSuccess: () => {
                          clearAll();
                          setReviewMode(false);
                          navigate(-1);
                        },
                      }
                    );
                  }
                },
                secondaryFn: () => {
                  clearAll();
                  setReviewMode(false);
                  navigate(-1);
                  onClose();
                },
              });
            }}
            className="bg-white size-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className=" bg-white p-12 rounded-lg w-5/6 lg:w-4/6 flex flex-col gap-8 items-center">
            <div className="space-y-2">
              <h3 className="text-2xl text-center">Make Payment</h3>
              <h2 className="text-primary bg-[#F4FDF8] px-4 py-2 rounded-lg text-3xl font-bold text-center inline-block">
                {formatNaira((carrier?.rate || 0) + (insurance?.price || 0))}
              </h2>
            </div>
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping Charge</span>
                <span className="font-bold text-text">
                  {formatNaira(carrier?.rate || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Insurance</span>
                <span className="font-bold text-text">
                  {formatNaira(insurance?.price || 0)}
                </span>
              </div>
              <hr className="border-gray-300 border-1" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-text">
                  {formatNaira((carrier?.rate || 0) + (insurance?.price || 0))}
                </span>
              </div>
            </div>
            {/* <div className="bg-[#0B2230] p-8 rounded-xl w-full flex justify-between gap-8 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h6 className="text-sm text-white">Wallet Balance</h6>
                  <button onClick={() => refetch()}>
                    <RefreshCw
                      className={cn(
                        "size-3.5 text-white",
                        isRefetching && "animate-spin"
                      )}
                    />
                  </button>
                </div>
                {walletLoading && (
                  <div className="w-full">
                    <Skeleton className="h-8 w-full bg-gray-600" />
                  </div>
                )}
                {data && !walletLoading && (
                  <h1 className="text-xl lg:text-[28px] leading-9 font-bold text-white">
                    {formatNaira(parseFloat(data?.data[0].balance))}
                  </h1>
                )}
              </div>
              <Button
                onClick={() => data && onOpen(data.data[0].id)}
                className="gap-2 items-center"
              >
                Top Up <ArrowRight className="size-4" />
              </Button>
            </div> */}
            <Button onClick={arrangeShipment} className="w-full" size="lg">
              {isPending ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Make Payment"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
