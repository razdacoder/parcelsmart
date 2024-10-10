import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { copyText, formatNaira } from "@/lib/utils";
import { format } from "date-fns";
import { Copy, Loader, X } from "lucide-react";
import useTransactionDetail from "../api/useTransactionDetail";
import { useTransactionDetailModal } from "../hooks/use-transaction-details";

export default function TransactionDetailModal() {
  const { isOpen, onClose, id } = useTransactionDetailModal();
  const { data, isLoading } = useTransactionDetail({ id });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className=" sm:max-w-xl p-0">
        <DialogClose className="absolute -top-12 z-50 right-0 size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-8 gap-4">
          <DialogTitle className="text-3xl font-medium text-text">
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        <div className="px-12 py-8 space-y-4">
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader className="text-primary animate-spin size-5" />
            </div>
          )}
          {data && (
            <>
              <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold t">Date</span>
                <span>{format(data.data.created_at, "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold t">Time</span>
                <span>{format(data.data.created_at, "hh:mm:ss a")}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold ">Transaction</span>
                <span>Fund</span>
              </div>
              <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold t">Amount</span>
                <span>{formatNaira(parseFloat(data.data.amount))}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold t">Status</span>
                <span>
                  {data.data.status === "success" ? "Successfull" : "Failed"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold t">Reference</span>
                <div className="flex items-center gap-2 ">
                  <span>{data.data.reference}</span>
                  <button onClick={() => copyText(data.data.reference)}>
                    <Copy className="size-4 text-primary" />
                  </button>
                </div>
              </div>
              {/* <div className="flex justify-between items-center text-sm text-text">
                <span className="font-bold t">From</span>
                <span>John Doe</span>
              </div> */}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
