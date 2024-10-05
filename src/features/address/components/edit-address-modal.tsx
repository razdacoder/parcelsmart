import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import AddressForm from "../forms/address-form";
import { useEditAddress } from "../hooks/use-edit-modal";

export default function EditAddressModal() {
  const { isOpen, onClose, address } = useEditAddress();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold">
              Edit Address
            </DialogTitle>
            {/* <DialogDescription>
             Edit 
            </DialogDescription> */}
          </div>
          <DialogClose>
            <XCircle className="size-6" />
          </DialogClose>
        </DialogHeader>

        <AddressForm address={address} />
      </DialogContent>
    </Dialog>
  );
}
