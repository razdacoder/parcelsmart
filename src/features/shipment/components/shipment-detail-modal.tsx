import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { copyText, formatNaira } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Copy,
  DownloadIcon,
  File,
  Loader,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useShipmentDetail from "../api/useShipmentDetail";
import { useShipmentDetailModal } from "../hooks/use-shipment-detail-modal";
import StatusBadge from "./status-badge";

export default function ShipmentDetailModal() {
  const { isOpen, onClose, id } = useShipmentDetailModal();
  const { data, isLoading } = useShipmentDetail({ id });
  const navigate = useNavigate();

  const calculateTotalWeight = (parcels: Parcel[]): number => {
    return parcels.reduce((totalWeight, parcel) => {
      const parcelWeight = parcel.items.reduce(
        (sum, item) => sum + item.weight,
        0
      );
      return totalWeight + parcelWeight;
    }, 0);
  };

  const calculateTotalValue = (parcels: Parcel[]): number => {
    return parcels.reduce((totalValue, parcel) => {
      const parcelValue = parcel.items.reduce(
        (sum, item) => sum + item.value,
        0
      );
      return totalValue + parcelValue;
    }, 0);
  };

  const extractedProofsOfPayments = data?.data.parcels.flatMap(
    (parcel) => parcel.proof_of_payments
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-4xl p-4 rounded-xl">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex flex-row items-center gap-4 p-0">
            Shipment Details
            {isLoading && <Skeleton className="h-8 w-12" />}
            {data && <StatusBadge status={data.data.status} />}
          </DialogTitle>
          <DialogClose className="cursor-pointer">
            <XCircle className="size-5" />
          </DialogClose>
        </DialogHeader>
        {isLoading && (
          <div className="py-12 flex justify-center items-center">
            <Loader className="size-6 text-primary animate-spin" />
          </div>
        )}
        {data && (
          <div className="space-y-2 md:space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F4FDF8] p-2 md:p-4 space-y-2 md:space-y-4">
                <h4 className="text-primary text-xs md:text-base font-bold">
                  Sender
                </h4>
                <div className="flex flex-col gap-0.5 text-xs md:text-base font-medium text-text">
                  <span>
                    {data.data.origin_address.first_name}{" "}
                    {data.data.origin_address.last_name}
                  </span>
                  <span>{data.data.origin_address.email}</span>
                  <span>{data.data.origin_address.phone_number}</span>
                  <span className="text-pretty md:text-balance">
                    {data.data.origin_address.line_1},{" "}
                    {data.data.origin_address.city},{" "}
                    {data.data.origin_address.state},
                    {data.data.origin_address.country}
                  </span>
                </div>
              </div>
              <div className="bg-[#F4FDF8] p-2 md:p-4 space-y-2 md:space-y-4">
                <h4 className="text-primary text-xs md:text-base font-bold">
                  Receiver
                </h4>
                <div className="flex flex-col gap-0.5 text-xs md:text-base font-medium text-text">
                  <span>
                    {data.data.destination_address.first_name}{" "}
                    {data.data.destination_address.last_name}
                  </span>
                  <span>{data.data.destination_address.email}</span>
                  <span>{data.data.destination_address.phone_number}</span>
                  <span className="text-balance">
                    {data.data.destination_address.line_1},{" "}
                    {data.data.destination_address.city},{" "}
                    {data.data.destination_address.state},
                    {data.data.destination_address.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#F4FDF8] p-2 md:p-4 space-y-2 md:space-y-4">
              <div className="grid grid-cols-2 gap-8">
                <div className="">
                  <h4 className="text-primary text-xs md:text-base font-bold">
                    Parcel Information
                  </h4>
                  <div className="flex flex-col gap-0.5 text-sm md:text-base font-medium text-text">
                    <div className="flex flex-col md:flex-row gap-2">
                      <span className="inline-block font-medium text-sm md:text-base">
                        Shipment ID:
                      </span>
                      <span className="font-semibold text-sm md:text-base truncate">
                        #{data.data.tracking_number || data.data.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base">
                      <span className="font-medium">Total Weight:</span>
                      <span className="font-bold">
                        {calculateTotalWeight(data.data.parcels)}kg
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base">
                      <span className="font-medium">Total Value:</span>
                      <span className="font-bold">
                        {formatNaira(calculateTotalValue(data.data.parcels))}
                      </span>
                    </div>
                  </div>
                  {data.data.parcels.map((parcel) => (
                    <div key={parcel.id} className="mt-4">
                      <div>
                        <h4 className="text-primary text-sm md:text-base font-bold">
                          {parcel.description}
                        </h4>
                        {parcel.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col gap-0.5 text-sm md:text-base font-medium text-text"
                          >
                            <div className="flex items-center gap-2 text-sm md:text-base">
                              <span className="font-medium">Item:</span>
                              <span className="font-bold">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm md:text-base">
                              <span className="font-medium">Qty:</span>
                              <span className="font-bold">{item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* <div className="space-y-1">
                    <h4 className="text-primary text-xs md:text-lg font-bold">
                      Proof of Weight
                    </h4>
                    <div className="flex  flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                      <div className="inline-flex w-2/3 md:w-3/12 justify-between bg-white items-center gap-2 py-2 px-6 rounded-lg">
                        <div className="flex items-center gap-2">
                          <File className="size-4" />
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-xs">
                              file.pdf
                            </span>
                            <span className="text-xs">50kb</span>
                          </div>
                        </div>
                        <DownloadIcon className="size-4" />
                      </div>
                    </div>
                  </div> */}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-primary text-sm md:text-base font-bold">
                    Carrier Information
                  </h4>
                  <div className="flex flex-col gap-0.5 text-sm md:text-base font-medium text-text">
                    <div className="flex flex-col md:flex-row gap-2">
                      <span className="inline-block font-medium text-sm">
                        Carrier Tracking ID:
                      </span>
                      <span className="font-semibold text-sm  flex items-center gap-1.5">
                        <span className="truncate">
                          Km8Gdl1h0TNBbGRvBLQ2YtjBS
                        </span>
                        <button
                          onClick={() => copyText("Km8Gdl1h0TNBbGRvBLQ2YtjBS")}
                        >
                          <Copy className="size-3.5 text-primary" />
                        </button>
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <span className=" block font-medium text-sm">
                        Carrier URL:
                      </span>
                      <span className=" font-semibold text-sm  flex items-center gap-1.5">
                        <span className="truncate underline text-primary">
                          https://www.dhl.com/ng-en/home/tracking.html
                        </span>
                        <button
                          onClick={() =>
                            copyText(
                              "https://www.dhl.com/ng-en/home/tracking.html"
                            )
                          }
                        >
                          <Copy className="size-3.5 text-primary" />
                        </button>
                      </span>
                    </div>
                    {extractedProofsOfPayments &&
                      extractedProofsOfPayments.length > 0 && (
                        <div className="space-y-1">
                          <h4 className="text-primary text-xs md:text-lg font-bold">
                            Proof of Purchase
                          </h4>
                          <div className="flex  flex-col gap-0.5 text-xs md:text-lg font-medium text-text">
                            {extractedProofsOfPayments.map((proof, index) => (
                              <div
                                key={`proof-of-payment-${index}`}
                                className="inline-flex w-2/3 md:w-3/12 justify-between bg-white items-center gap-2 py-2 px-6 rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <File className="size-4" />
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-xs">
                                      Proof of Payment {index + 1}
                                    </span>
                                    {/* <span className="text-xs">50kb</span> */}
                                  </div>
                                </div>
                                <Link to={proof}>
                                  <DownloadIcon className="size-4" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {data.data.status === "draft" && (
              <div className="flex justify-center items-center">
                <Button
                  className="gap-2"
                  onClick={() => {
                    onClose();
                    navigate(`/shipment/new?shipment_id=${data.data.id}`);
                  }}
                >
                  Resume Shipment Booking <ArrowRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
