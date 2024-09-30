import dhlImage from "@/assets/dhl.png";
import kwikImage from "@/assets/kwik.png";
import redStarImage from "@/assets/redstar.png";
import upsImage from "@/assets/ups.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNaira } from "@/lib/utils";
import { RefreshCw, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDropOff } from "../hooks/use-drop-off";

export default function CarrierForm() {
  const navigate = useNavigate();
  const { onOpen } = useDropOff();

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-text">
            Select Carrier
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose your preferred rate.
          </p>
        </div>
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <XCircle className="size-6" />
        </button>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Select>
          <SelectTrigger className="h-10 w-64">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recomendation" className="text-sm">
              Sort by: Recommendation
            </SelectItem>
          </SelectContent>
        </Select>
        <Button className="gap-2 bg-[#F4FDF8] text-primary hover:bg-[#F4FDF8]/80 hover:text-primary/90 shadow-none">
          <RefreshCw className="text-primary size-4" />
          Refresh
        </Button>
      </div>
      <div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-3 md:py-4 rounded-lg has-[:checked]:border-primary">
            <div className="flex items-center justify-between w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r1"
              />
              <div className="flex items-center gap-4">
                <img
                  src={dhlImage}
                  alt="DHL Image"
                  className="size-8 md:size-12"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs md:text-sm font-medium">
                    DHL Express
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    DOMESTIC
                  </p>
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                <p className="text-xs text-muted-foreground">
                  Delivery: Within 4 days
                </p>
              </div>
              <Badge className="hidden md:inline-flex bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                Dropoff
              </Badge>

              <h2 className="text-base md:text-xl font-bold">
                {formatNaira(4407.69)}
              </h2>

              <Label
                onClick={onOpen}
                htmlFor="r1"
                className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
            <div className="flex items-center justify-between w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r2"
              />
              <div className="flex items-center gap-4">
                <img
                  src={kwikImage}
                  alt="DHL Image"
                  className="size-8 md:size-12"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs md:text-sm font-medium">
                    Kwik Delivery
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Standard Delivery
                  </p>
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                <p className="text-xs text-muted-foreground">
                  Delivery: Within 4 days
                </p>
              </div>
              <Badge className="hidden md:inline-flex bg-[#F4FDF8] text-primary hover:bg-[#F4FDF8] hover:text-primary shadow-none">
                Save Money
              </Badge>

              <h2 className="text-base md:text-xl font-bold">
                {formatNaira(1407.69)}
              </h2>

              <Label
                htmlFor="r2"
                className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
            <div className="flex items-center justify-between w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r3"
              />
              <div className="flex items-center gap-4">
                <img
                  src={upsImage}
                  alt="DHL Image"
                  className="size-8 md:size-12"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs md:text-sm font-medium truncate">
                    UPS
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Express Saver
                  </p>
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                <p className="text-xs text-muted-foreground">
                  Delivery: Within 4 days
                </p>
              </div>
              <Badge className="hidden md:bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                Dropoff
              </Badge>

              <h2 className="text-base md:text-xl font-bold">
                {formatNaira(1407.69)}
              </h2>

              <Label
                htmlFor="r3"
                className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
            <div className="flex items-center justify-between w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r4"
              />
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
                <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
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

              <Label
                htmlFor="r4"
                className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
