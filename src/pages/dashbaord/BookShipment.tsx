import ShipmentReview from "@/features/shipment/components/shipment-review";
import Stepper from "@/features/shipment/components/stepper";
import { useReviewMode } from "@/features/shipment/hooks/use-review-mode";
import { cn } from "@/lib/utils";

export default function BookShipment() {
  const { reviewMode } = useReviewMode();
  return (
    <main
      className={cn(
        "bg-[#F8FAFC] min-h-screen flex justify-center items-center py-24",
        reviewMode && "bg-white py-0 items-start h-full"
      )}
    >
      <div
        className={cn(
          "bg-white max-w-6xl w-full p-4 md:p-8",
          reviewMode && "w-full max-w-full grid lg:grid-cols-5 md:p-0 relative"
        )}
      >
        <Stepper />
        {reviewMode && (
          <div className="relative col-span-1 lg:col-span-2">
            <ShipmentReview />
          </div>
        )}
      </div>
    </main>
  );
}
