import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import UpdatePasswordForm from "../forms/update-password-form";
import { useUpdatePasswordModal } from "../hooks/use-update-password-modal";

export default function UpdatePasswordModal() {
  const { isOpen, onClose } = useUpdatePasswordModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-xl p-0">
        <DialogClose className="absolute -top-10 md:-top-12 z-50 right-0 size-8 md:size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-4 md:size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-4 md:py-8 gap-2">
          <DialogTitle className="text-2xl md:text-3xl font-medium text-text">
            New password
          </DialogTitle>
          <DialogDescription>Enter your new password</DialogDescription>
        </DialogHeader>
        <div className="p-4 md:p-8 space-y-4">
          <UpdatePasswordForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
