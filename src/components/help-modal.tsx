import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react";

import instagram from "@/assets/instagram.svg";
import phone from "@/assets/phone.svg";
import whatsapp from "@/assets/whatsapp.svg";
import x from "@/assets/x.svg";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HelpModalProps = {
  children: ReactNode;
};

export function HelpSupportModal({ children }: HelpModalProps) {
  return (
    <Dialog>
      <DialogOverlay className="bg-black/80" />
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-11/12 md:max-w-xl rounded-lg">
        <DialogHeader className="flex-row justify-between items-center">
          <DialogTitle className="text-xl">
            Contact Customer Support
          </DialogTitle>
          <DialogDescription className="sr-only">
            Contact Customer Support
          </DialogDescription>
          <DialogClose>
            <XCircle className="size-6 fill-black stroke-white" />
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Link
            to="#"
            className="flex items-center gap-4 px-4 py-2 rounded-xl border"
          >
            <img src={whatsapp} alt="Whatsapp Logo" />
            <div className="flex flex-col gap-0.5">
              <h5 className="text-lg text-text font-semibold">Whatsapp</h5>
              <p className="text-gray-500 text-sm">
                We respond as fast as possible.
              </p>
            </div>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-4 px-4 py-2 rounded-xl border"
          >
            <img src={phone} alt="Phone" />
            <div className="flex flex-col gap-0.5">
              <h5 className="text-lg text-text font-semibold">Phone Call</h5>
              <p className="text-gray-500 text-sm">
                Our friendly customer support will pick.
              </p>
            </div>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-4 px-4 py-2 rounded-xl border"
          >
            <img src={instagram} alt="Whatsapp Logo" />
            <div className="flex flex-col gap-0.5">
              <h5 className="text-lg text-text font-semibold">Instagram</h5>
              <p className="text-gray-500 text-sm">
                We respond as fast as possible.
              </p>
            </div>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-4 px-4 py-2 rounded-xl border"
          >
            <img src={x} alt="X Logo" />
            <div className="flex flex-col gap-0.5">
              <h5 className="text-lg text-text font-semibold">Twitter</h5>
              <p className="text-gray-500 text-sm">
                We respond as fast as possible.
              </p>
            </div>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
