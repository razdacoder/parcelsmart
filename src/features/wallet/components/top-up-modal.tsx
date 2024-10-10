import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyText, formatNaira } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, Loader, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import useVirtualAccount from "../api/useVirtualAccount";
import { useTopUpModal } from "../hooks/use-top-up-modal";

export default function TopUpModal() {
  const { isOpen, onClose } = useTopUpModal();
  const [fundType, setFundType] = useState<"transfer" | "card">("transfer");
  const { data: virtualAccount, isLoading } = useVirtualAccount();
  const queryClient = useQueryClient();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-xl p-0 rounded-lg">
        <DialogClose className="absolute -top-10 md:-top-12 z-50 right-0 size-8 md:size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-4 md:size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-4 md:py-8 gap-2 md:gap-4 rounded-lg">
          <DialogTitle className="text-2xl md:text-3xl font-medium text-text">
            Fund Wallet
          </DialogTitle>
          <DialogDescription className="hidden md:flex flex-col md:flex-row items-center gap-2 bg-white p-2 text-xs rounded-md text-muted-foreground">
            <TriangleAlert className="fill-yellow-500 stroke-white" />
            It may take 2-5 minutes for your top-up to reflect to your wallet
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 md:p-8 space-y-4">
          <div className="flex flex-col gap-6">
            <label className=" has-[:checked]:text-primary ring-1 ring-gray-400 has-[:checked]:ring-primary px-6 rounded-md py-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-text has-[:checked]:text-primary">
                <input
                  type="radio"
                  checked={fundType === "transfer"}
                  onChange={() => setFundType("transfer")}
                  name="fund-option"
                  className="checked:border-primary accent-primary size-6 p-3"
                />
                Fund with bank transfer
              </div>
              <svg
                width="30"
                height="25"
                viewBox="0 0 30 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.4994H5V18.4994H3C2.73478 18.4994 2.48043 18.6047 2.29289 18.7923C2.10536 18.9798 2 19.2342 2 19.4994C2 19.7646 2.10536 20.0189 2.29289 20.2065C2.48043 20.394 2.73478 20.4994 3 20.4994H27C27.2652 20.4994 27.5196 20.394 27.7071 20.2065C27.8946 20.0189 28 19.7646 28 19.4994C28 19.2342 27.8946 18.9798 27.7071 18.7923C27.5196 18.6047 27.2652 18.4994 27 18.4994H25V10.4994H28C28.2176 10.4992 28.4292 10.428 28.6026 10.2966C28.7761 10.1653 28.902 9.98097 28.9612 9.77161C29.0205 9.56225 29.0098 9.33928 28.9308 9.13653C28.8519 8.93378 28.709 8.76231 28.5238 8.64813L15.5238 0.648128C15.3662 0.551276 15.1849 0.5 15 0.5C14.8151 0.5 14.6338 0.551276 14.4762 0.648128L1.47625 8.64813C1.29103 8.76231 1.14811 8.93378 1.06916 9.13653C0.990213 9.33928 0.979546 9.56225 1.03878 9.77161C1.09801 9.98097 1.22391 10.1653 1.39738 10.2966C1.57085 10.428 1.78242 10.4992 2 10.4994ZM7 10.4994H11V18.4994H7V10.4994ZM17 10.4994V18.4994H13V10.4994H17ZM23 18.4994H19V10.4994H23V18.4994ZM15 2.67313L24.4675 8.49938H5.5325L15 2.67313ZM30 23.4994C30 23.7646 29.8946 24.0189 29.7071 24.2065C29.5196 24.394 29.2652 24.4994 29 24.4994H1C0.734784 24.4994 0.48043 24.394 0.292893 24.2065C0.105357 24.0189 0 23.7646 0 23.4994C0 23.2342 0.105357 22.9798 0.292893 22.7923C0.48043 22.6047 0.734784 22.4994 1 22.4994H29C29.2652 22.4994 29.5196 22.6047 29.7071 22.7923C29.8946 22.9798 30 23.2342 30 23.4994Z"
                  fill="#157C7B"
                />
              </svg>
            </label>
            <label className=" has-[:checked]:text-primary ring-1 ring-gray-400 has-[:checked]:ring-primary px-6 rounded-md py-4 flex items-center justify-between">
              <div className="flex items-center gap-4  text-text has-[:checked]:text-primary">
                <input
                  type="radio"
                  checked={fundType === "card"}
                  onChange={() => setFundType("card")}
                  name="fund-option"
                  className="checked:border-primary accent-primary size-6 p-3"
                />
                Fund with card
              </div>
              <div className="flex items-center gap-0.5">
                <svg
                  width="32"
                  height="23"
                  viewBox="0 0 32 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_999_620"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="32"
                    height="23"
                  >
                    <path
                      d="M32 0.833008H0V22.1663H32V0.833008Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_999_620)">
                    <path
                      d="M29.3333 0.833008H2.66667C1.19391 0.833008 0 2.02691 0 3.49967V19.4997C0 20.9724 1.19391 22.1663 2.66667 22.1663H29.3333C30.8061 22.1663 32 20.9724 32 19.4997V3.49967C32 2.02691 30.8061 0.833008 29.3333 0.833008Z"
                      fill="#252525"
                    />
                    <path
                      d="M12 18.1663C15.6819 18.1663 18.6667 15.1816 18.6667 11.4997C18.6667 7.81777 15.6819 4.83301 12 4.83301C8.31814 4.83301 5.33337 7.81777 5.33337 11.4997C5.33337 15.1816 8.31814 18.1663 12 18.1663Z"
                      fill="#EB001B"
                    />
                    <path
                      d="M20 18.1663C23.6819 18.1663 26.6667 15.1816 26.6667 11.4997C26.6667 7.81777 23.6819 4.83301 20 4.83301C16.3181 4.83301 13.3334 7.81777 13.3334 11.4997C13.3334 15.1816 16.3181 18.1663 20 18.1663Z"
                      fill="#F79E1B"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 6.16602C17.6193 7.3823 18.6667 9.31875 18.6667 11.4998C18.6667 13.6809 17.6193 15.6174 16 16.8336C14.3808 15.6174 13.3334 13.6809 13.3334 11.4998C13.3334 9.31875 14.3808 7.3823 16 6.16602Z"
                      fill="#FF5F00"
                    />
                  </g>
                </svg>
                <svg
                  width="32"
                  height="23"
                  viewBox="0 0 32 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_999_628)">
                    <path
                      d="M28.999 1.16699H2.999C1.52624 1.16699 0.332336 2.3609 0.332336 3.83366V19.167C0.332336 20.6397 1.52624 21.8337 2.999 21.8337H28.999C30.4718 21.8337 31.6657 20.6397 31.6657 19.167V3.83366C31.6657 2.3609 30.4718 1.16699 28.999 1.16699Z"
                      fill="white"
                      stroke="black"
                      stroke-opacity="0.2"
                      stroke-width="0.5"
                    />
                    <path
                      d="M3.71696 8.72023C3.01943 8.33765 2.22336 8.02996 1.33331 7.81644L1.37065 7.65015H5.01995C5.5146 7.66749 5.91597 7.81632 6.04658 8.34193L6.83967 12.1231L7.08262 13.262L9.30394 7.65015H11.7024L8.13715 15.871H5.7386L3.71696 8.72023ZM13.4666 15.8798H11.1984L12.6171 7.65015H14.8852L13.4666 15.8798ZM21.689 7.85134L21.3806 9.62843L21.1754 9.54104C20.765 9.37464 20.2232 9.20836 19.4858 9.22593C18.5903 9.22593 18.1887 9.58467 18.1794 9.93492C18.1794 10.3202 18.6652 10.5741 19.4585 10.9507C20.7653 11.5372 21.3715 12.2551 21.3624 13.1919C21.3441 14.8992 19.7947 16.0024 17.4147 16.0024C16.3971 15.9936 15.417 15.7918 14.8851 15.5644L15.2025 13.717L15.5011 13.8485C16.2385 14.1553 16.7237 14.2863 17.6293 14.2863C18.2823 14.2863 18.9825 14.0322 18.9914 13.4808C18.9914 13.1219 18.6931 12.859 17.8156 12.4563C16.957 12.0621 15.8091 11.4056 15.8277 10.2236C15.8374 8.62154 17.4147 7.50098 19.6546 7.50098C20.532 7.50098 21.2416 7.68483 21.689 7.85134ZM24.7036 12.9643H26.589C26.4957 12.5528 26.0662 10.583 26.0662 10.583L25.9076 9.87383C25.7956 10.1802 25.5998 10.6793 25.6092 10.6617C25.6092 10.6617 24.8904 12.4915 24.7036 12.9643ZM27.5035 7.65015L29.3333 15.8796H27.2332C27.2332 15.8796 27.0277 14.9341 26.9625 14.6452H24.0504C23.9661 14.8639 23.5743 15.8796 23.5743 15.8796H21.1944L24.5635 8.33297C24.7969 7.79887 25.208 7.65015 25.749 7.65015H27.5035Z"
                      fill="#171E6C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_999_628">
                      <rect
                        width="32"
                        height="22"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </label>
          </div>
          {fundType === "transfer" && (
            <div className="space-y-4">
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin size-6 text-primary" />
                </div>
              )}
              {virtualAccount && (
                <>
                  <div className="mt-4 rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Account Name</span>
                      <span className="text-sm font-medium">
                        {virtualAccount.data[0].account_name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Account Number</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        {virtualAccount.data[0].account_number}
                        <button
                          onClick={() =>
                            copyText(virtualAccount.data[0].account_number)
                          }
                        >
                          <Copy className="size-3.5 text-primary" />
                        </button>
                      </span>
                    </div>{" "}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Bank</span>
                      <span className="text-sm font-medium ">
                        {virtualAccount.data[0].bank_name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Charge</span>
                      <span className="text-sm font-medium ">
                        {formatNaira(50)}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      queryClient.invalidateQueries({ queryKey: ["wallet"] });
                      queryClient.invalidateQueries({
                        queryKey: ["transactions"],
                      });
                      onClose();
                    }}
                    size="lg"
                    className="w-full"
                  >
                    I have made payment
                  </Button>
                </>
              )}
            </div>
          )}
          {fundType === "card" && (
            <div className="space-y-4 mt-4">
              <div className="space-y-1">
                <Label>Enter amount to fund</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground">
                    NGN
                  </span>
                  <Input className="ps-14" type="text" />
                </div>
              </div>
              <div className="mt-4 rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Charge</span>
                  <span className="text-sm font-medium ">
                    {formatNaira(50)}
                  </span>
                </div>
              </div>
              <Button size="lg" className="w-full bg-black hover:bg-black">
                Continue with Paystack
              </Button>
              <Button size="lg" className="w-full bg-black hover:bg-black">
                Continue with Flutterwave
              </Button>
              <Button
                onClick={() => onClose()}
                size="lg"
                className="w-full bg-[#F4FDF8] text-primary hover:text-primary hover:bg-[#F4FDF8]"
              >
                Cancel and Return to Parcels
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
