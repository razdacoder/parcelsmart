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
import { useEditAddress } from "../hooks/use-edit-modal";

export default function EditAddressModal() {
  const { isOpen, onClose, address } = useEditAddress();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-4xl rounded-lg">
        <DialogHeader className="flex-row justify-between gap-2 items-center">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold text-left">
              Edit Address
            </DialogTitle>
            <DialogDescription className="sr-only text-left">
              Edit Address
            </DialogDescription>
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
