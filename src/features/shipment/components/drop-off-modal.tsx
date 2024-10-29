import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader, MapPin, X } from "lucide-react";
import { useState } from "react";

import { useDropOff } from "../hooks/use-drop-off";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";
import useDropLocations from "@/features/shipment/api/useDropLocations.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function DropOffModal() {
  const { isOpen, onClose, required, carrier } = useDropOff();
  const [dropOff, setDropOff] = useState<"yes" | "no">("no");
  const { sender, setDropOffId } = useShipmentApplication();
  const [dropLocation, setDropLocation] = useState<string>();
  const { data, isLoading, isError } = useDropLocations({
    load: dropOff === "yes",
    country_code: sender?.country,
    carrier,
    state_name: sender?.state,
    // address_id: sender?.id
  });

  function saveAndContinue() {
    if (dropOff === "no") {
      onClose();
    } else {
      if (dropLocation) {
        setDropOffId(dropLocation);
        onClose()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      setDropOff("no")
      onClose()
    }}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className=" w-11/12 md:max-w-xl p-0 rounded-lg">
        <DialogClose className="absolute -top-12 z-50 right-0 size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-8 gap-4 rounded-lg">
          <DialogTitle className="text-3xl font-medium text-text">
            Drop off your package
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-3">
          {!required && (
            <div className="space-y-2">
              <h4 className="font-bold">
                Would you like to pick up your shipment?
              </h4>
              <RadioGroup
                defaultValue="no"
                onValueChange={(value) => setDropOff(value as "yes" | "no")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dr1" />
                  <Label htmlFor="dr1">
                    No, I want my shipment picked up from my address.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="dr2" />
                  <Label htmlFor="dr2">
                    Yes. I would like to drop-off at a nearby location.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {dropOff === "yes" && (
            <>
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader className="size-6 animate-spin text-primary" />
                </div>
              )}

              {data?.data.length === 0 && (
                <div className="flex items-center justify-center">
                  <p className="text-primary text-sm font-medium capitalize">
                    No drop off location found for this carrier
                  </p>
                </div>
              )}

              {isError && (
                <div className="flex items-center justify-center">
                  <p className="text-destructive">
                    Error loading drop off locations
                  </p>
                </div>
              )}
              <ScrollArea className="space-y-2 p-4 h-[300px]">
                {data &&
                  data.data.map((location) => (
                    <div className="flex items-center space-x-2 mb-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
                      <div className="flex items-center justify-between w-full px-2">
                        <input
                          type="radio"
                          name="dropoff"
                          checked={dropLocation === location.id}
                          value={location.id}
                          onChange={(e) => setDropLocation(e.target.value)}
                          className="hidden peer"
                          id={location.id}
                        />
                        <div className="flex items-start gap-4">
                          <MapPin />
                          <div className="w-5/6">
                            <p className="text-xs text-text">
                              {location.address}
                            </p>
                            <span className="text-[10px] leading-5 font-medium text-primary">
                              {location.state} {location.country}
                            </span>
                          </div>
                        </div>

                        <Label
                          htmlFor={location.id}
                          className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
                        >
                          {dropLocation === location.id ? "Selected" : "Select"}
                        </Label>
                      </div>
                    </div>
                  ))}
              </ScrollArea>
            </>
          )}

          <Button onClick={saveAndContinue} className="w-full">
            Save & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
