import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { Edit, Loader } from "lucide-react";
import useArrangeShipment from "../api/useArrangeShipment";
import { useReviewMode } from "../hooks/use-review-mode";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function Review({ prev, moveToStep }: StepsProps) {
  const { setReviewMode } = useReviewMode();
  const {
    sender,
    receiver,
    parcels,
    carrier,
    insurance,
    location,
    shipmentID,
    rate_id,
    drop_off_id,
    useInsurance,
  } = useShipmentApplication();
  const { mutate: arrangeShipmentFn, isPending } = useArrangeShipment();

  const calculateTotalWeight = (): number => {
    return parcels.reduce((totalWeight, parcel) => {
      const parcelWeight = parcel.items.reduce(
        (sum, item) => sum + item.weight,
        0
      );
      return totalWeight + parcelWeight;
    }, 0);
  };

  const calculateTotalValue = (): number => {
    return parcels.reduce((totalValue, parcel) => {
      const parcelValue = parcel.items.reduce(
        (sum, item) => sum + (item.itemType === "items" ? item.value : 10000),
        0
      );
      return totalValue + parcelValue;
    }, 0);
  };

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
      <div className="space-y-6">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-text">Review Shipment</h3>
            <p className="text-sm text-muted-foreground">
              Confirm all details below before making payment.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-primary text-lg font-bold">Sender</h3>
              <button
                onClick={() => {
                  moveToStep?.(0);
                  setReviewMode(false);
                }}
                className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary"
              >
                <Edit className="text-primary size-4" />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium text-text">
                {sender?.first_name} {sender?.last_name}
              </span>
              <span className="text-lg font-medium text-text">
                {sender?.email}
              </span>
              <span className="text-lg font-medium text-text">
                {sender?.phone_number}
              </span>
              <span className="text-lg font-medium text-text text-balance">
                {sender?.line_1}, {sender?.city}, {sender?.state},{" "}
                {sender?.country}
              </span>
            </div>
          </div>
          <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-primary text-lg font-bold">Receiver</h3>
              <button
                onClick={() => {
                  moveToStep?.(1);
                  setReviewMode(false);
                }}
                className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary"
              >
                <Edit className="text-primary size-4" />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium text-text">
                {receiver?.first_name} {receiver?.last_name}
              </span>
              <span className="text-lg font-medium text-text">
                {receiver?.email}
              </span>
              <span className="text-lg font-medium text-text">
                {receiver?.phone_number}
              </span>
              <span className="text-lg font-medium text-text text-balance">
                {receiver?.line_1}, {receiver?.city}, {receiver?.state},{" "}
                {receiver?.country}
              </span>
            </div>
          </div>
          <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-primary text-lg font-bold">
                Parcel Information
              </h3>
              <button
                onClick={() => {
                  moveToStep?.(2);
                  setReviewMode(false);
                }}
                className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary"
              >
                <Edit className="text-primary size-4" />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium text-text">
                Total Weight: {calculateTotalWeight()}kg; Currency: NGN; Total
                Value: {formatNaira(calculateTotalValue())}
              </span>
              {parcels.map((parcel, index) => (
                <div
                  key={`parcel-review-${index}`}
                  className="flex flex-col gap-1"
                >
                  <span className="text-lg font-medium text-text">
                    Parcel {index + 1} - {parcel.packaging_value}
                  </span>
                  {parcel.items.map((item, item_index) => (
                    <span
                      key={`parcel-review-item-${item_index}`}
                      className="text-lg font-medium text-text"
                    >
                      {item.name}, {item.quantity}pieces. {item.weight}kg,{" "}
                      {formatNaira(
                        item.itemType === "items" ? item.value : 10000
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-primary text-lg font-bold">
                Carrier Information
              </h3>
              <button
                onClick={() => {
                  moveToStep?.(3);
                  setReviewMode(false);
                }}
                className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary"
              >
                <Edit className="text-primary size-4" />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-1 space-y-4">
              <div className="flex items-center gap-4">
                <img src={carrier?.logo} alt="" className="size-10" />
                <div className="flex items-center gap-6 text-sm">
                  <span>{carrier?.name}</span>
                  <span>{formatNaira(carrier?.rate || 0)}</span>
                </div>
              </div>
              <div className="flex items-start gap-12">
                {location && (
                  <div className="space-y-1">
                    <h6 className="text-sm font-semibold text-primary">
                      Dropoff Location
                    </h6>
                    <span className="text-sm text-balance text-text">
                      {location}
                    </span>
                  </div>
                )}

                {useInsurance && (
                  <div className="space-y-1">
                    <h6 className="text-sm font-semibold text-primary">
                      Insurance
                    </h6>
                    <span className="text-sm text-balance text-text">
                      {insurance?.name} - {formatNaira(insurance?.price || 0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
          <Button
            type="button"
            onClick={() => {
              setReviewMode(false);
              prev?.();
            }}
            size="lg"
            className="bg-[#E2FAEC] text-primary shadow-none w-full md:w-fit hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
          >
            Previous
          </Button>

          <Button
            onClick={arrangeShipment}
            disabled={isPending}
            size="lg"
            className="px-12 w-full md:w-fit"
          >
            {isPending ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              "Make Payment"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
