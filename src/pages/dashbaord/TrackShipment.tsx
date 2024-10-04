import AppNavBar from "@/components/app-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackModal } from "@/features/track/hooks/use-track-modal";
import { ArrowRight, Search } from "lucide-react";

export default function TrackShipment() {
  const { onOpen } = useTrackModal();
  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      <AppNavBar title="Track Shipment" />
      <main className="px-4 md:px-8 space-y-6 rounded-lg">
        <div className="py-12 px-4 md:px-8 bg-white">
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="flex-1 flex flex-col gap-1.5">
              <Label>Enter a Shipping ID to see updates</Label>
              <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  className="ps-10"
                  type="text"
                  placeholder="SDY668b76228"
                />
              </div>
            </div>
            <Button onClick={onOpen} className="gap-2" size="lg">
              Track Shipment <ArrowRight className="size-4 " />{" "}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
