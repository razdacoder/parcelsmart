import dhlImage from "@/assets/dhl.png";
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

export default function CarrierForm({ next, prev }: StepsProps) {
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
            <div className="grid grid-cols-12 gap-8 w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r1"
              />
              <div className="col-span-3 flex items-center gap-4">
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
              <div className="col-span-3 flex items-center">
                <div className="hidden md:flex flex-col gap-1">
                  <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                  <p className="text-xs text-muted-foreground">
                    Delivery: Within 4 days
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Badge className="hidden md:inline-flex h-6 px-3 text-center bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                  Dropoff
                </Badge>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <h2 className="text-center text-base md:text-xl font-bold">
                  {formatNaira(4407.69)}
                </h2>
              </div>

              <Label
                onClick={onOpen}
                htmlFor="r1"
                className="col-span-2 px-6 py-3 rounded-xl border-2 cursor-pointer text-center peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>{" "}
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-3 md:py-4 rounded-lg has-[:checked]:border-primary">
            <div className="grid grid-cols-12 gap-8 w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r1"
              />
              <div className="col-span-3 flex items-center gap-4">
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
              <div className="col-span-3 flex items-center">
                <div className="hidden md:flex flex-col gap-1">
                  <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                  <p className="text-xs text-muted-foreground">
                    Delivery: Within 4 days
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Badge className="hidden md:inline-flex h-6 px-3 text-center bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                  Dropoff
                </Badge>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <h2 className="text-center text-base md:text-xl font-bold">
                  {formatNaira(4407.69)}
                </h2>
              </div>

              <Label
                onClick={onOpen}
                htmlFor="r1"
                className="col-span-2 px-6 py-3 rounded-xl border-2 cursor-pointer text-center peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>{" "}
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-3 md:py-4 rounded-lg has-[:checked]:border-primary">
            <div className="grid grid-cols-12 gap-8 w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r1"
              />
              <div className="col-span-3 flex items-center gap-4">
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
              <div className="col-span-3 flex items-center">
                <div className="hidden md:flex flex-col gap-1">
                  <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                  <p className="text-xs text-muted-foreground">
                    Delivery: Within 4 days
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Badge className="hidden md:inline-flex h-6 px-3 text-center bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                  Dropoff
                </Badge>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <h2 className="text-center text-base md:text-xl font-bold">
                  {formatNaira(4407.69)}
                </h2>
              </div>

              <Label
                onClick={onOpen}
                htmlFor="r1"
                className="col-span-2 px-6 py-3 rounded-xl border-2 cursor-pointer text-center peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
            </div>
          </div>{" "}
          <div className="flex items-center space-x-2 w-full border-2 px-2 py-3 md:py-4 rounded-lg has-[:checked]:border-primary">
            <div className="grid grid-cols-12 gap-8 w-full px-2">
              <input
                type="radio"
                name="carrier"
                className="hidden peer"
                id="r1"
              />
              <div className="col-span-3 flex items-center gap-4">
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
              <div className="col-span-3 flex items-center">
                <div className="hidden md:flex flex-col gap-1">
                  <h4 className="text-sm font-medium">Pickup: Within 2 days</h4>
                  <p className="text-xs text-muted-foreground">
                    Delivery: Within 4 days
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Badge className="hidden md:inline-flex h-6 px-3 text-center bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                  Dropoff
                </Badge>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <h2 className="text-center text-base md:text-xl font-bold">
                  {formatNaira(4407.69)}
                </h2>
              </div>

              <Label
                onClick={onOpen}
                htmlFor="r1"
                className="col-span-2 px-6 py-3 rounded-xl border-2 cursor-pointer text-center peer-checked:bg-primary peer-checked:text-white"
              >
                Select
              </Label>
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
