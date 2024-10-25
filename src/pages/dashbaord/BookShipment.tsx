import useShipmentDetail from "@/features/shipment/api/useShipmentDetail";
import ShipmentReview from "@/features/shipment/components/shipment-review";
import Stepper from "@/features/shipment/components/stepper";
import { useReviewMode } from "@/features/shipment/hooks/use-review-mode";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function BookShipment() {
  const { reviewMode } = useReviewMode();
  const [searchParams] = useSearchParams();
  const shipmentID = searchParams.get("shpiment_id");
  const navigate = useNavigate();
  const { data: prevData, isLoading: prevLoading } = useShipmentDetail({
    id: shipmentID as string | undefined,
  });
  const { onOpen, onClose } = useAlertModal();

  useEffect(() => {
    if (prevData) {
      if (prevData?.data.status !== "draft") {
        onOpen({
          type: "warning",
          title: "Info",
          message: "This shipment has already be arranged",
          primaryLabel: "Book new Shipment",
          secondaryLabel: "Back to shipments",
          primaryFn: () => {
            navigate("/shipment/new");
            onClose();
          },
          secondaryFn: () => {
            onClose();
            navigate("/shipment");
          },
        });
      }
    }
  }, [navigate, onClose, onOpen, prevData, shipmentID]);

  return (
    <main
      className={cn(
        "bg-[#F8FAFC] min-h-screen flex justify-center items-center py-24",
        reviewMode && "bg-white py-0 items-start h-full"
      )}
    >
      <div
        className={cn(
          " w-full  min-h-[60vh]",
          reviewMode && "w-full max-w-full grid lg:grid-cols-5 md:p-0 relative"
        )}
      >
        <Stepper data={prevData?.data} prevloading={prevLoading} />
        {reviewMode && (
          <div className="relative col-span-1 lg:col-span-2">
            <ShipmentReview />
          </div>
        )}
      </div>
    </main>
  );
}
