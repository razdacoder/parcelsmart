import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useDefaultAddress } from "@/features/address/hooks/use-default-address";
import useDeleteAccount from "@/features/auth/api/use-delete-account";
import useMe from "@/features/auth/api/useMe";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { getInitials } from "@/lib/utils";
import { ArrowRight, Edit, MapPin, MoreVertical, Trash2 } from "lucide-react";
import { useUpdatePasswordModal } from "../hooks/use-update-password-modal";
import { useUpdateProfileModal } from "../hooks/use-update-profile-modal";

export default function ProfileView() {
  const { onOpen } = useUpdateProfileModal();
  const { onOpen: openPasswordModal } = useUpdatePasswordModal();
  const { data, isLoading } = useMe();
  const { onOpen: openDefaultAddress } = useDefaultAddress();
  const { onOpen: alertOpen, onClose: alertClose } = useAlertModal();
  const { mutate: deleteAccount } = useDeleteAccount();

  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2 justify-between items-center border-2 rounded-xl p-3">
        <div className="flex items-center gap-4">
          {isLoading && (
            <>
              <Skeleton className="w-full h-16" />
            </>
          )}
          {data && (
            <>
              <Avatar className="size-16">
                <AvatarImage
                  src={data?.data.profile_picture as string | undefined}
                />
                <AvatarFallback className="bg-primary font-semibold text-white text-lg">
                  {getInitials(data?.data.first_name, data?.data.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-bold">
                  {data?.data.first_name} {data?.data.last_name}
                </h4>
                <p className="text-xs">{data?.data.email}</p>
              </div>
            </>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 focus:ring-0 ">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="size-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onOpen} className="cursor-pointer">
              <Edit className="size-4" /> Edit profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={openPasswordModal}
              className="cursor-pointer"
            >
              <Edit className="size-4" /> Change password
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                alertOpen({
                  type: "warning",
                  title: "Are you sure!",
                  message: "This action is not reversible",
                  primaryLabel: "Continue",
                  secondaryLabel: "Cancel",
                  primaryFn: () =>
                    deleteAccount(undefined, {
                      onSuccess: () => {
                        alertClose();
                      },
                    }),
                  secondaryFn: () => alertClose(),
                });
              }}
              className="text-destructive hover:text-destructive cursor-pointer"
            >
              <Trash2 className="size-4" /> Delete account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center border-2 rounded-xl p-3">
        <div className="flex items-center gap-4">
          <MapPin className="size-12 lg:size-16 text-primary" />
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold">Default Address</h4>
            <p className="text-xs">Click to add a default pickup address</p>
          </div>
        </div>
        <Button
          onClick={() => openDefaultAddress()}
          className="w-full md:w-fit gap-2 items-center text-sm"
        >
          Set Default Address <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
