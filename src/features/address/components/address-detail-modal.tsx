import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Edit, XCircle } from "lucide-react";
import { useAddressDetailModal } from "../hooks/use-address-detail";

export default function AddressDetailModal() {
  const { isOpen, onClose } = useAddressDetailModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold"></DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
          <DialogClose>
            <XCircle className="size-6" />
          </DialogClose>
        </DialogHeader>
        <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary text-lg font-bold">
              Personal Information
            </h3>
            <button className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary">
              <Edit className="text-primary size-4" />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium text-text">
              <span className="font-medium">Name: </span>
              <span className="font-bold">John Doe</span>
            </p>
            <p className="text-lg font-medium text-text">
              <span className="font-medium">Email: </span>
              <span className="font-bold">johndoe@email.com</span>
            </p>
            <p className="text-lg font-medium text-text">
              <span className="font-medium">Phone Number: </span>
              <span className="font-bold">+2349113825115</span>
            </p>
            <p>
              <span className="font-medium">Date Created: </span>
              <span className="font-bold">28/09/2024 10:31:03 PM</span>
            </p>
          </div>
        </div>
        <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary text-lg font-bold">Locaction</h3>
            <Button className="gap-2 items-center">
              Book Shipment <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium text-text">
              <span className="font-medium">Address: </span>
              <span className="font-bold">
                11 Chief Albert Iyorah Street, Lekki, Nigeria, Lekki, Lagos, NG
              </span>
            </p>
            <p className="text-lg font-medium text-text">
              <span className="font-medium">Zip Code: </span>
              <span className="font-bold">106104</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
