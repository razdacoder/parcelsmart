import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatNaira } from "@/lib/utils";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";
import { useTransactionDetailModal } from "../hooks/use-transaction-details";

export default function TransactionDetailModal() {
  const { isOpen, onClose } = useTransactionDetailModal();

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
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">Date</span>
            <span>29/09/2024</span>
          </div>
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">Time</span>
            <span>11:00:22 PM</span>
          </div>
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">Transaction</span>
            <span>Fund</span>
          </div>
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">Amount</span>
            <span>{formatNaira(5000)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">Status</span>
            <span>Successful</span>
          </div>
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">Reference</span>
            <div className="flex items-center gap-2 ">
              <span>#576576576565</span>
              <button
                onClick={() => {
                  window.navigator.clipboard.writeText("#65657657676");
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="size-4 text-primary" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-text">
            <span className="font-bold t">From</span>
            <span>John Doe</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
