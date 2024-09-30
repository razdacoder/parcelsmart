import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { formatNaira } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowRight, DownloadIcon, File, XCircle } from "lucide-react";
import { useShipmentDetailModal } from "../hooks/use-shipment-detail-modal";

export default function ShipmentDetailModal() {
  const { isOpen, onClose } = useShipmentDetailModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="sm:max-w-xs md:max-w-2xl lg:max-w-4xl">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex flex-row items-center gap-4 p-0">
            Shipment Details
            <Badge className="bg-[#EFF6FF] py-1 px-3 text-[#2563EB] w-15 flex justify-center text-xs hover:bg-[#EFF6FF] hover:text-[#2563EB]">
              Completed
            </Badge>
          </DialogTitle>
          <DialogClose className="cursor-pointer">
            <XCircle className="size-5" />
          </DialogClose>
        </DialogHeader>
        <div className="space-y-2 md:space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F4FDF8] p-2 md:p-4 space-y-2 md:space-y-4">
              <h4 className="text-primary text-xs md:text-lg font-bold">
                Sender
              </h4>
              <div className="flex flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                <span>John Doe</span>
                <span>johndoe@gmail.com</span>
                <span>+2349113825115</span>
                <span className="text-pretty md:text-balance">
                  27, Shawn Avenue, Agege, Lagos, Alimosho, Lagos, NG.
                </span>
              </div>
            </div>
            <div className="bg-[#F4FDF8] p-2 md:p-4 space-y-2 md:space-y-4">
              <h4 className="text-primary text-xs md:text-lg font-bold">
                Reciever
              </h4>
              <div className="flex flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                <span>Aminat Musa</span>
                <span>amusa@gmail.com</span>
                <span>+2349113825115</span>
                <span className="text-balance">
                  27, Shawn Avenue, Agege, Lagos, Alimosho, Lagos, NG.
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#F4FDF8] p-2 md:p-4 space-y-2 md:space-y-4">
            <h4 className="text-primary text-xs md:text-lg font-bold">
              Parcel Information
            </h4>
            <div className="flex flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
              <div className="flex items-center gap-2">
                <span className="font-medium">Shipment ID:</span>
                <span className="font-bold">#12i348rf334337</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Total Weight:</span>
                <span className="font-bold">1kg</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Total Value:</span>
                <span className="font-bold">{formatNaira(4000)}</span>
              </div>
            </div>
            <div>
              <h4 className="text-primary text-xs md:text-lg font-bold">
                Parcel 1
              </h4>
              <div className="flex flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Item:</span>
                  <span className="font-bold">HP Laptop</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Qty:</span>
                  <span className="font-bold">1</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-primary text-xs md:text-lg font-bold">
                Proof of Purchase
              </h4>
              <div className="flex  flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                <div className="inline-flex w-2/3 md:w-3/12 justify-between bg-white items-center gap-2 py-2 px-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <File className="size-4" />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs">file.pdf</span>
                      <span className="text-xs">50kb</span>
                    </div>
                  </div>
                  <DownloadIcon className="size-4" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-primary text-xs md:text-lg font-bold">
                Proof of Weight
              </h4>
              <div className="flex  flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                <div className="inline-flex w-2/3 md:w-3/12 justify-between bg-white items-center gap-2 py-2 px-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <File className="size-4" />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs">file.pdf</span>
                      <span className="text-xs">50kb</span>
                    </div>
                  </div>
                  <DownloadIcon className="size-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button className="gap-2">
              Resume Shipment Booking <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
