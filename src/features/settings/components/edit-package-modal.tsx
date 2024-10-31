import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, X } from "lucide-react";

import useGetPackaging from "../api/use-get-packaging";
import PackageForm from "../forms/package-form";
import { useEditPackage } from "../hooks/use-edit-package";

export default function EditPackageModal() {
  const { isOpen, onClose, id } = useEditPackage();
  const { data, isLoading } = useGetPackaging({ id: id });

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
            Edit Packaging
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 md:p-8 space-y-4">
          {isLoading && (
            <div className="py-12 flex items-center justify-center">
              <Loader className="text-primary size-6 animate-spin" />
            </div>
          )}

          {data && <PackageForm packaging={data.data} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
