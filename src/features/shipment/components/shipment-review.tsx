import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function ShipmentReview() {
  return (
    <div className="bg-primary sticky h-screen top-0 right-0 w-full flex justify-center items-center px-32">
      <div className="bg-white p-12 rounded-lg w-full flex flex-col gap-8 items-center">
        <div className="space-y-2">
          <h3 className="text-2xl text-center">Make Payment</h3>
          <h2 className="text-primary bg-[#F4FDF8] px-4 py-2 rounded-lg text-3xl font-bold text-center inline-block">
            {formatNaira(2428.12)}
          </h2>
        </div>
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Shipping Charge</span>
            <span className="font-bold text-text">{formatNaira(1912.18)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Insurance</span>
            <span className="font-bold text-text">{formatNaira(500)}</span>
          </div>
          <hr className="border-gray-300 border-1" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold text-text">{formatNaira(2428.12)}</span>
          </div>
        </div>
        <div className="bg-[#0B2230] p-8 rounded-xl w-full flex justify-between gap-8 items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h6 className="text-sm text-white">Wallet Balance</h6>
              <button>
                <RefreshCw className="size-3.5 text-white" />
              </button>
            </div>
            <h1 className="text-white text-2xl font-bold">
              {formatNaira(100000)}
            </h1>
          </div>
          <Button className="gap-2 items-center">
            Top Up <ArrowRight className="size-4" />
          </Button>
        </div>
        <Button className="w-full" size="lg">
          Make Payment
        </Button>
      </div>
    </div>
  );
}
