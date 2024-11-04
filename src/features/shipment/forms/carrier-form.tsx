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
import { useAlertModal } from "@/hooks/use-alert-modal";
import { formatNaira, isLeastExpensiveRate } from "@/lib/utils";
import { Loader, RefreshCw, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetRates from "../api/getRates";
import { useDropOff } from "../hooks/use-drop-off";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function CarrierForm({ next, prev }: StepsProps) {
  const navigate = useNavigate();
  const { onOpen } = useDropOff();
  const { clearAll, shipmentID, setRateID, rate_id, setCarrier, carrier } =
    useShipmentApplication();
  const {
    data,
    isLoading: loading,
    error,
    refetch,
    isRefetching,
  } = useGetRates({ shipment_id: shipmentID });
  const [selectedCarrier, setSelectedCarrier] = useState<string | null>(() => {
    if (carrier) {
      return carrier.slug;
    }
    return null;
  });
  const isLoading = loading || isRefetching;
  const { onOpen: alertOpen, onClose: alertClose } = useAlertModal();
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
        <button
          onClick={() => {
            alertOpen({
              type: "warning",
              title: "Warning",
              message: "Are you sure you want to discard all changes",
              primaryLabel: "Continue",
              secondaryLabel: "Cancel",
              primaryFn: () => {
                clearAll();
                navigate(-1);
                alertClose();
              },
              secondaryFn: () => {
                alertClose();
              },
            });
          }}
          className="cursor-pointer"
        >
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
        <Button
          onClick={() => refetch()}
          className="gap-2 bg-[#F4FDF8] text-primary hover:bg-[#F4FDF8]/80 hover:text-primary/90 shadow-none"
        >
          <RefreshCw className="text-primary size-4" />
          Refresh
        </Button>
      </div>
      <div>
        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader className="size-5 animate-spin text-primary" />
          </div>
        )}

        {error && !isLoading && (
          <div className="flex justify-center items-center text-destructive py-24">
            <p>{error.response?.data.message}</p>
          </div>
        )}
        {data && !isLoading && (
          <div className="space-y-2">
            {data.data.map((rate) => {
              return (
                <div
                  key={rate.id}
                  className="flex items-center space-x-2 w-full border-2 px-2 py-3 md:py-4 rounded-lg has-[:checked]:border-primary"
                >
                  <div className="grid grid-cols-12 gap-8 w-full px-2">
                    <input
                      type="radio"
                      name="carrier"
                      className="hidden peer"
                      checked={selectedCarrier === rate.carrier_slug}
                      value={rate.carrier_slug}
                      onChange={(e) => {
                        setSelectedCarrier(e.target.value);
                        setRateID(rate.id);
                        setCarrier({
                          name: rate.carrier_name,
                          logo: rate.carrier_logo,
                          slug: rate.carrier_slug,
                          rate: rate.amount,
                        });
                      }}
                      id={rate.carrier_slug}
                    />
                    <div className="col-span-6 md:col-span-3  flex items-center gap-4">
                      <img
                        src={rate.carrier_logo}
                        alt="DHL Image"
                        className="size-8 md:size-12"
                      />
                      <div className="flex flex-col gap-1">
                        <h4 className="text-xs md:text-sm font-medium">
                          {rate.carrier_name}
                        </h4>
                        {/*<p className="text-xs md:text-sm text-muted-foreground">*/}
                        {/*  DOMESTIC*/}
                        {/*</p>*/}
                      </div>
                    </div>
                    <div className="hidden col-span-3 md:flex items-center">
                      <div className="hidden md:flex flex-col gap-1">
                        <h4 className="text-sm font-medium">
                          Pickup: {rate.estimated_pickup_time}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Delivery: {rate.estimated_delivery_time}
                        </p>
                      </div>
                    </div>
                    <div className="hidden col-span-4 md:flex items-center justify-center gap-2">
                      {(rate.dropoff_available ||
                        rate.dropoff_required ||
                        rate.dropoff_only) && (
                        <Badge className="hidden md:inline-flex h-6 px-3 text-center bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                          Drop Off
                        </Badge>
                      )}
                      {isLeastExpensiveRate(data.data) ===
                        rate.carrier_slug && (
                        <Badge className="hidden md:inline-flex h-6 px-3 text-center bg-[#F4FDF8] text-primary hover:bg-[#F4FDF8] hover:text-primary shadow-none">
                          Save Money
                        </Badge>
                      )}
                    </div>
                    <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                      <h2 className="text-center text-base md:text-lg font-bold">
                        {formatNaira(rate.amount)}
                      </h2>
                    </div>

                    <Label
                      onClick={() => {
                        if (rate.dropoff_available || rate.dropoff_available) {
                          onOpen(rate.dropoff_required, rate.carrier_slug);
                        }
                      }}
                      htmlFor={rate.carrier_slug}
                      className="col-span-3 md:col-span-1 w-full flex items-center justify-center rounded-xl border-2 cursor-pointer text-center peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary"
                    >
                      {selectedCarrier === rate.carrier_slug
                        ? "Selected"
                        : "Select"}
                    </Label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          disabled={!rate_id}
          onClick={() => next?.()}
          size="lg"
          className="px-12 w-full md:w-fit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
