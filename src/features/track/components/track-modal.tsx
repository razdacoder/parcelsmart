import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { copyText } from "@/lib/utils";
import { Circle, Copy, XCircle } from "lucide-react";
import { useTrackModal } from "../hooks/use-track-modal";

export default function TrackModal() {
  const { isOpen, onClose } = useTrackModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-2xl lg:max-w-3xl overflow-auto">
        <DialogHeader className="flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold"></DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
          <DialogClose>
            <XCircle className="size-6" />
          </DialogClose>
        </DialogHeader>
        <div className=" p-4 rounded-lg space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F4FDF8] px-8 py-6 border rounded-lg space-y-4">
              <h4 className="text-lg pb-3 border-b border-gray-200 font-semibold">
                Tracking Status
              </h4>
              <div className="flex flex-col gap-10">
                <div className="flex gap-3 items-center">
                  <div className="size-6 rounded-full flex justify-center items-center border border-primary bg-white relative after:absolute after:block after:top-6 after:h-10 after:border after:border-dashed">
                    <Circle className="size-3 fill-primary stroke-none" />
                  </div>
                  <div className="">
                    <h6 className="text-xs leading-[10px] text-text font-medium">
                      Shipment Saved
                    </h6>
                    <span className="text-[10px] leading-[8px] text-text">
                      Mar 01, 02:48 PM
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="size-6 rounded-full flex justify-center items-center border border-primary bg-white relative after:absolute after:block after:top-6 after:h-10 after:border after:border-dashed">
                    <Circle className="size-3 fill-primary stroke-none" />
                  </div>
                  <div className="">
                    <h6 className="text-xs leading-[10px] text-text font-medium">
                      Shipment Saved
                    </h6>
                    <span className="text-[10px] leading-[8px] text-text">
                      Mar 01, 02:48 PM
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="size-6 rounded-full flex justify-center items-center border border-primary bg-white relative after:absolute after:block after:top-6 after:h-10 after:border after:border-dashed">
                    <Circle className="size-3 fill-primary stroke-none" />
                  </div>
                  <div className="">
                    <h6 className="text-xs leading-[10px] text-text font-medium">
                      Shipment Saved
                    </h6>
                    <span className="text-[10px] leading-[8px] text-text">
                      Mar 01, 02:48 PM
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="size-6 rounded-full flex justify-center items-center border border-primary bg-white relative after:absolute after:block after:top-6 after:h-10 after:border after:border-dashed">
                    <Circle className="size-3 fill-primary stroke-none" />
                  </div>
                  <div className="">
                    <h6 className="text-xs leading-[10px] text-text font-medium">
                      Shipment Saved
                    </h6>
                    <span className="text-[10px] leading-[8px] text-text">
                      Mar 01, 02:48 PM
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="size-6 rounded-full flex justify-center items-center border border-primary bg-white relative after:absolute after:block after:top-6 after:h-10 after:border after:border-dashed">
                    <Circle className="size-3 fill-primary stroke-none" />
                  </div>
                  <div className="">
                    <h6 className="text-xs leading-[10px] text-text font-medium">
                      Shipment Saved
                    </h6>
                    <span className="text-[10px] leading-[8px] text-text">
                      Mar 01, 02:48 PM
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="size-6 rounded-full flex justify-center items-center border border-orange-500 bg-white ">
                    {/* <Circle className="size-3 fill-primary stroke-none" /> */}
                  </div>
                  <div className="">
                    <h6 className="text-xs leading-[10px] text-text font-medium">
                      Shipment Saved
                    </h6>
                    <span className="text-[10px] leading-[8px] text-text">
                      Mar 01, 02:48 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4 bg-[#F4FDF8] px-8 py-6 border rounded-lg">
                <h4 className="text-lg pb-3 border-b border-gray-200 font-semibold">
                  Reciever
                </h4>
                <div className="flex flex-col gap-1.5 text-xs font-medium text-text">
                  <span>Amina Musa</span>
                  <span>aminamusa@gmail.com</span>
                  <span>+23337474667373</span>
                  <span className="text-balance">
                    30, Shawn Avenue, Agege, Lagos, Alimosho, Lagos, NG.
                  </span>
                </div>
              </div>
              <div className="bg-[#F4FDF8] px-8 py-6 border rounded-lg space-y-4">
                <h4 className="text-lg pb-3 border-b border-gray-200 font-semibold">
                  Tracking ID
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-balance text-text">
                    PXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS
                  </span>
                  <button
                    className="cursor-pointer"
                    onClick={() => copyText("PXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS")}
                  >
                    <Copy className="size-4 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
