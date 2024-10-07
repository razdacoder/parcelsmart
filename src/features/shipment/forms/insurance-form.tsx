import logoImage from "@/assets/parcels icon.png";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatNaira } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InsuranceForm({ next, prev }: StepsProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-text">
            Purchase Insurance
          </h3>
          <p className="text-sm text-muted-foreground">
            Protect your shipment with an insurance cover.
          </p>
        </div>
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <XCircle className="size-6" />
        </button>
      </div>

      <div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-4">
                <img
                  src={logoImage}
                  alt="DHL Image"
                  className="md:size-8 size-12"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs md:text-sm font-medium">
                    Parcels Mart
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    DOMESTIC
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="insurace"
                  className="hidden peer"
                  id="in1"
                />
                <h2 className="text-base md:text-xl font-bold justify-self-end">
                  {formatNaira(5000)}
                </h2>
                <Label
                  htmlFor="in1"
                  className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
                >
                  Select
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
        <Button
          type="button"
          onClick={() => prev?.()}
          size="lg"
          className="bg-[#E2FAEC] text-primary shadow-none w-full md:w-fit hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
        >
          Previous
        </Button>

        <Button
          onClick={() => next()}
          size="lg"
          className="px-12 w-full md:w-fit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
