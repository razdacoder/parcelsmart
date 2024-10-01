import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit, MapPin } from "lucide-react";
import { useUpdatePasswordModal } from "../hooks/use-update-password-modal";
import { useUpdateProfileModal } from "../hooks/use-update-profile-modal";

export default function ProfileView() {
  const { onOpen } = useUpdateProfileModal();
  const { onOpen: openPasswordModal } = useUpdatePasswordModal();
  return (
    <div className="space-y-2">
      <div className="flex justify-between border-2 rounded-xl p-3">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary font-semibold text-white text-lg">
              RR
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold">John Doe</h4>
            <p className="text-xs">johndoe@email.com</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onOpen}
            variant="outline"
            className="gap-2 items-center h-8 text-sm text-primary border-primary"
          >
            <Edit className="size-4" /> Edit Profile
          </Button>
          <Button
            onClick={openPasswordModal}
            variant="outline"
            className="gap-2 items-center h-8 text-sm text-primary border-primary"
          >
            <Edit className="size-4" /> Change Password
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center border-2 rounded-xl p-3">
        <div className="flex items-center gap-4">
          <MapPin className="size-16 text-primary" />
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold">Default Address</h4>
            <p className="text-xs">Click to add a default pickup address</p>
          </div>
        </div>
        <Button className="gap-2 items-center text-sm">
          Set Default Address <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
