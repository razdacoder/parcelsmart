import kwikImage from "@/assets/kwik.png";
import { formatNaira } from "@/lib/utils";
import { Edit } from "lucide-react";

export default function Review() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-text">Review Shipment</h3>
          <p className="text-sm text-muted-foreground">
            Confirm all details below before making payment.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary text-lg font-bold">Sender</h3>
            <button className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary">
              <Edit className="text-primary size-4" />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-medium text-text">John Doe</span>
            <span className="text-lg font-medium text-text">
              johndoe@email.com
            </span>
            <span className="text-lg font-medium text-text">
              +2349113825115
            </span>
            <span className="text-lg font-medium text-text text-balance">
              27, Shawn Avenue, Agege, Lagos, Alimosho, Lagos, NG.
            </span>
          </div>
        </div>
        <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary text-lg font-bold">Receiver</h3>
            <button className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary">
              <Edit className="text-primary size-4" />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-medium text-text">John Doe</span>
            <span className="text-lg font-medium text-text">
              johndoe@email.com
            </span>
            <span className="text-lg font-medium text-text">
              +2349113825115
            </span>
            <span className="text-lg font-medium text-text text-balance">
              27, Shawn Avenue, Agege, Lagos, Alimosho, Lagos, NG.
            </span>
          </div>
        </div>
        <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary text-lg font-bold">
              Parcel Information
            </h3>
            <button className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary">
              <Edit className="text-primary size-4" />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-medium text-text">
              Total Weight: 1kg; Currency: NGN; Total Value: ₦2,000.00
            </span>
            <span className="text-lg font-medium text-text">
              Parcel 1 - Terminal Default Standard (10cm x 10cm x 10cm)
            </span>
            <span className="text-lg font-medium text-text">
              Item 1 5G, 1pieces. 1kg, N2,000.00
            </span>
          </div>
        </div>
        <div className="bg-[#F4FDF8] p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary text-lg font-bold">
              Carrier Information
            </h3>
            <button className="inline-flex items-center gap-2 text-primary px-6 py-1 rounded-xl text-sm border border-primary">
              <Edit className="text-primary size-4" />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-1 space-y-4">
            <div className="flex items-center gap-4">
              <img src={kwikImage} alt="" className="size-10" />
              <div className="flex items-center gap-6 text-sm">
                <span>Kwik Delivery</span>
                <span>{formatNaira(1049.62)}</span>
              </div>
            </div>
            <div className="flex items-start gap-12">
              <div className="space-y-1">
                <h6 className="text-sm font-semibold text-primary">
                  Dropoff Location
                </h6>
                <span className="text-sm text-balance text-text">
                  14, TOYIN STREET, IKEJA, LAGOS-STATE, IKEJA, LAGOS STATE
                </span>
              </div>
              <div className="space-y-1">
                <h6 className="text-sm font-semibold text-primary">
                  Insurance
                </h6>
                <span className="text-sm text-balance text-text">
                  Parcels Mart Insurance - N500.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
