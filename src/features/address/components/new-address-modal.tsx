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
import { useNewAddress } from "../hooks/use-new-address";

export default function NewAddressModal() {
  const { isOpen, onClose } = useNewAddress();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-2xl font-bold">
              Create New Address
            </DialogTitle>
            <DialogDescription>
              Add new Address to your address book to make shipping faster. you
              can edit later
            </DialogDescription>
          </div>
          <DialogClose>
            <XCircle className="size-6" />
          </DialogClose>
        </DialogHeader>
        <AddressForm />
      </DialogContent>
    </Dialog>
  );
}
