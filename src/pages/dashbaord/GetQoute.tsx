import redStarImage from "@/assets/redstar.png";
import AppNavBar from "@/components/app-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QouteForm from "@/features/qoute/forms/qoute-form";
import { formatNaira } from "@/lib/utils";

export default function GetQoute() {
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Get Quote" />
      <main className="px-4 md:px-8 space-y-6">
        <div className="bg-white py-12 px-8 space-y-8">
          <QouteForm />
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Available Rates</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg">
                <div className="flex items-center justify-between w-full px-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={redStarImage}
                      alt="DHL Image"
                      className="size-8 md:size-12"
                    />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs md:text-sm font-medium">
                        Redstar Express
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Normal Delivery
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col gap-1">
                    <h4 className="text-sm font-medium">
                      Pickup: Within 2 days
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Delivery: Within 4 days
                    </p>
                  </div>
                  <Badge className="hidden md:inline-flex bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                    Dropoff
                  </Badge>

                  <h2 className="text-base md:text-xl font-bold">
                    {formatNaira(1407.69)}
                  </h2>

                  <Button>Book Shipment</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
