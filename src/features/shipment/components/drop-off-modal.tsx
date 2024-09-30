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
import { MapPin, X } from "lucide-react";
import { useState } from "react";
import { useDropOff } from "../hooks/use-drop-off";

export default function DropOffModal() {
  const { isOpen, onClose } = useDropOff();
  const [dropOff, setDropOff] = useState<"yes" | "no">("no");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className=" sm:max-w-xl p-0">
        <DialogClose className="absolute -top-12 z-50 right-0 size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-8 gap-4">
          <DialogTitle className="text-3xl font-medium text-text">
            Drop off your package
          </DialogTitle>
        </DialogHeader>
        <div className="p-8 space-y-3">
          <div className="space-y-2">
            <h4 className="font-bold">
              Would you like to pick up your shipment?
            </h4>
            <RadioGroup
              defaultValue="no"
              onValueChange={(value) => setDropOff(value as "yes" | "no")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r1" />
                <Label htmlFor="dr1">
                  No, I want my shipment picked up from my address.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r2" />
                <Label htmlFor="dr2">
                  Yes. I would like to drop-off at a nearby location.
                </Label>
              </div>
            </RadioGroup>
          </div>
          {dropOff === "yes" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
                <div className="flex items-center justify-between w-full px-2">
                  <input
                    type="radio"
                    name="dropoff"
                    className="hidden peer"
                    id="d1"
                  />
                  <div className="flex items-start gap-4">
                    <MapPin />
                    <div className="w-5/6">
                      <p className="text-xs text-text">
                        14, TOYIN STREET, IKEJA, LAGOS-STATE, IKEJA , LAGOS
                        STATE
                      </p>
                      <span className="text-[10px] leading-5 font-medium text-primary">
                        10.38km
                      </span>
                    </div>
                  </div>

                  <Label
                    htmlFor="d1"
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
                    name="dropoff"
                    className="hidden peer"
                    id="d3"
                  />
                  <div className="flex items-start gap-4">
                    <MapPin />
                    <div className="w-5/6">
                      <p className="text-xs text-text">
                        14, TOYIN STREET, IKEJA, LAGOS-STATE, IKEJA , LAGOS
                        STATE
                      </p>
                      <span className="text-[10px] leading-5 font-medium text-primary">
                        10.38km
                      </span>
                    </div>
                  </div>

                  <Label
                    htmlFor="d3"
                    className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
                  >
                    Select
                  </Label>
                </div>
              </div>{" "}
              <div className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg has-[:checked]:border-primary">
                <div className="flex items-center justify-between w-full px-2">
                  <input
                    type="radio"
                    name="dropoff"
                    className="hidden peer"
                    id="d2"
                  />
                  <div className="flex items-start gap-4">
                    <MapPin />
                    <div className="w-5/6">
                      <p className="text-xs text-text">
                        14, TOYIN STREET, IKEJA, LAGOS-STATE, IKEJA , LAGOS
                        STATE
                      </p>
                      <span className="text-[10px] leading-5 font-medium text-primary">
                        10.38km
                      </span>
                    </div>
                  </div>

                  <Label
                    htmlFor="d2"
                    className="px-6 py-3 rounded-xl border-2 cursor-pointer peer-checked:bg-primary peer-checked:text-white"
                  >
                    Select
                  </Label>
                </div>
              </div>
            </div>
          )}

          <Button className="w-full">Save & Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
