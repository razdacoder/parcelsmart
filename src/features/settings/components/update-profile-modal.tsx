import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateProfileForm from "@/features/settings/forms/update-profile-form";
import { useUpdateProfileModal } from "@/features/settings/hooks/use-update-profile-modal";
import { X } from "lucide-react";

export default function UpdateProfileModal() {
  const { isOpen, onClose } = useUpdateProfileModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-xl p-0 rounded-xl">
        <DialogClose className="absolute -top-10 md:-top-12 z-50 right-0 size-8 md:size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-4 md:size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-4 md:py-8 gap-2 md:gap-4 rounded-xl">
          <DialogTitle className="text-2xl md:text-3xl font-medium text-text">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 md:p-8 space-y-4">
          <UpdateProfileForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
