import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { TriangleAlert, X } from "lucide-react";
import { useNewItemModal } from "../hooks/use-new-item-modal";
import ItemForm from "./item-form";

export default function NewItemModal() {
  const { isOpen, onClose } = useNewItemModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-xl p-0 rounded-lg">
        <DialogClose className="absolute -top-10 md:-top-12 z-50 right-0 size-8 md:size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-4 md:size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-4 md:py-8 gap-2 md:gap-4 rounded-lg">
          <DialogTitle className="text-2xl md:text-3xl font-medium text-text">
            Add Items
          </DialogTitle>
          <DialogDescription className="hidden md:flex flex-col md:flex-row items-center gap-2 bg-white p-2 text-xs rounded-md text-muted-foreground">
            <TriangleAlert className="fill-yellow-500 stroke-white" />
            Shipments containing undervalued and prohibited items will be
            canceled.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 md:p-8 space-y-4">
          <ItemForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
