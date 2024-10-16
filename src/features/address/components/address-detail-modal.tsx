import { useAlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShipmentApplication } from "@/features/shipment/hooks/use-shipment-application-store";
import { format } from "date-fns";
import { ArrowRight, Edit, Loader2, Trash2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAddress from "../api/useAddress";
import useDeleteAddress from "../api/useDeleteAddress";
import { useAddressDetailModal } from "../hooks/use-address-detail";
import { useEditAddress } from "../hooks/use-edit-modal";

export default function AddressDetailModal() {
  const { isOpen, onClose, id } = useAddressDetailModal();
  const { data, isLoading, isError } = useAddress({ id });
  const { mutate: deleteAddress, isPending } = useDeleteAddress();
  const { setSenderValues } = useShipmentApplication();
  const navigate = useNavigate();
  const { onOpen } = useEditAddress();
  const [AlertModal, confirm] = useAlertModal({
    type: "warning",
    title: "Are you sure?",
    message: "This action will delete this address permanently.",
    primaryLabel: "Continue",
    secondaryLabel: "Cancel",
  });

  return (
    <>
      <AlertModal />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="max-w-3xl">
          <DialogHeader className="flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-2xl font-bold">
                Address Detail
              </DialogTitle>
              {/* <DialogDescription></DialogDescription> */}
            </div>
            <DialogClose>
              <XCircle className="size-6" />
            </DialogClose>
          </DialogHeader>
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin size-5" />
            </div>
          )}
          {isError && (
            <div className="flex justify-center items-center h-full">
              <p className="text-sm text-destructive">
                Fialed to fetch address detail
              </p>
            </div>
          )}
          {data && (
            <>
              <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-primary text-lg font-bold">
                    Personal Information
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isPending}
                      onClick={() => onOpen(data.data)}
                      className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary"
                    >
                      <Edit className="text-primary size-4" />
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        const ok = await confirm();
                        if (ok) {
                          deleteAddress(
                            { id: data.data.id },
                            {
                              onSuccess: () => {
                                onClose();
                              },
                            }
                          );
                        }
                      }}
                      className="inline-flex items-center gap-2 text-destructive px-6 py-1 rounded-xl text-sm border border-destructive"
                    >
                      <Trash2 className="text-destructive size-4" />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-medium text-text">
                    <span className="font-medium">Name: </span>
                    <span className="font-bold">
                      {data.data.first_name} {data.data.last_name}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-text">
                    <span className="font-medium">Email: </span>
                    <span className="font-bold">{data.data.email}</span>
                  </p>
                  <p className="text-lg font-medium text-text">
                    <span className="font-medium">Phone Number: </span>
                    <span className="font-bold">{data.data.phone_number}</span>
                  </p>
                  <p>
                    <span className="font-medium">Date Created: </span>
                    <span className="font-bold">
                      {format(data.data.created_at, "dd/MM/yyyy hh:mm:ss a")}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-primary text-lg font-bold">Location</h3>
                  <Button
                    onClick={() => {
                      onClose();
                      setSenderValues(data.data);
                      navigate(`/shipment/new`);
                    }}
                    className="gap-2 items-center"
                  >
                    Book Shipment <ArrowRight className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-medium text-text">
                    <span className="font-medium">Address: </span>
                    <span className="font-bold">
                      {data.data.line_1} {data.data.city} {data.data.state}{" "}
                      {data.data.country}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-text">
                    <span className="font-medium">Zip Code: </span>
                    <span className="font-bold">{data.data.zip_code}</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
