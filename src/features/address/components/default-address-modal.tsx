import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import AddressForm from "../forms/address-form";
import { useDefaultAddress } from "../hooks/use-default-address";

export default function DefaultAddressModal() {
  const { isOpen, onClose } = useDefaultAddress();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold">
              Set Up Your Default Address
            </DialogTitle>
            <DialogDescription>
              Create an address to ease your shipment booking process.
            </DialogDescription>
          </div>
          <DialogClose>
            <XCircle className="size-6" />
          </DialogClose>
        </DialogHeader>
        <AddressForm defaultMode />
      </DialogContent>
    </Dialog>
  );
}
