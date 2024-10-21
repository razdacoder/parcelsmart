import { useAlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useWallet from "@/features/wallet/api/useWallet";
import { useTopUpModal } from "@/features/wallet/hooks/use-top-up-modal";
import { cn, formatNaira } from "@/lib/utils";
import { ArrowRight, Loader, RefreshCw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useArrangeShipment from "../api/useArrangeShipment";
import { useReviewMode } from "../hooks/use-review-mode";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function ShipmentReview() {
  const navigate = useNavigate();
  const { carrier, insurance, clearAll, shipmentID, rate_id, drop_off_id } =
    useShipmentApplication();
  const { data, isLoading, isRefetching, refetch } = useWallet();
  const { onOpen } = useTopUpModal();
  const { setReviewMode } = useReviewMode();
  const { mutate: arrangeShipmentFn, isPending } = useArrangeShipment();

  const [AlertModal, confirm] = useAlertModal({
    title: "Success!!",
    message: "Congratulations! Your shipment has been arranged successfully",
    primaryLabel: "Continue",
    secondaryLabel: "Close",
    type: "success",
  });

  const walletLoading = isLoading;

  function arrangeShipment() {
    if (shipmentID && rate_id)
      arrangeShipmentFn(
        {
          shipment_id: shipmentID,
          rate_id,
          dropoff_id: drop_off_id,
        },
        {
          onSuccess: async () => {
            const ok = await confirm();
            if (ok) {
              clearAll();
              setReviewMode(false);
              navigate("/");
            }
          },
        }
      );
  }
  return (
    <>
      <AlertModal />
      <div className="bg-primary sticky h-screen top-0 right-0 w-full flex flex-col ">
        <div className="flex justify-end p-8">
          <button
            onClick={() => {
              clearAll();
              navigate(-1);
            }}
            className="bg-white size-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 flex justify-between items-center px-32">
          <div className=" bg-white p-12 rounded-lg w-full flex flex-col gap-8 items-center">
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
            <div className="bg-[#0B2230] p-8 rounded-xl w-full flex justify-between gap-8 items-center">
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
            </div>
            <Button onClick={arrangeShipment} className="w-full" size="lg">
              {isPending ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Arrange Shipment"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
