import { TrackShipmentResponseType } from "@/features/shipment/api/useTrackShipment";
import { cn, copyText } from "@/lib/utils";
import { format } from "date-fns";
import { Circle, Copy } from "lucide-react";

export default function TrackResult({
  data,
}: {
  data: TrackShipmentResponseType;
}) {
  return (
    <div className=" mt-8 rounded-lg space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#F4FDF8] px-8 py-6 border rounded-lg space-y-4">
          <h4 className="text-lg pb-3 border-b border-gray-200 font-semibold">
            Tracking Status
          </h4>
          <div className="flex flex-col gap-10">
            {data?.data.tracking_events.map((event, index) => (
              <div className="flex gap-3 items-center">
                <div
                  className={cn(
                    "size-6 md:size-10 rounded-full flex justify-center items-center border border-primary bg-white relative after:absolute after:block after:top-10 after:h-10 after:border after:border-dashed",
                    event.status === "in-transit" &&
                      "border-orange-500 after:hidden",
                    index === data.data.tracking_events.length - 1 &&
                      "after:hidden"
                  )}
                >
                  <Circle className="size-4 md:size-6 fill-primary stroke-none" />
                </div>
                <div className="">
                  <h6 className="text-xs md:text-sm leading-[10px] text-text font-medium w-56 truncate">
                    {event.description}
                  </h6>
                  <span className="text-xs leading-[8px] text-text">
                    {format(event.date, "MMM dd, hh:mm a")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4 bg-[#F4FDF8] px-8 py-6 border rounded-lg">
            <h4 className="text-lg pb-3 border-b border-gray-200 font-semibold">
              Reciever
            </h4>
            <div className="flex flex-col gap-1.5 text-sm font-medium text-text">
              <span>
                {data.data.destination_address.first_name}{" "}
                {data.data.destination_address.last_name}
              </span>
              <span>{data.data.destination_address.email}</span>
              <span>{data.data.destination_address.phone_number}</span>
              <span className="text-balance">
                {data.data.destination_address.line_1},{" "}
                {data.data.destination_address.city},{" "}
                {data.data.destination_address.state},{" "}
                {data.data.destination_address.country}
              </span>
            </div>
          </div>
          <div className="bg-[#F4FDF8] px-8 py-6 border rounded-lg space-y-4">
            <h4 className="text-lg pb-3 border-b border-gray-200 font-semibold">
              Tracking ID
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-balance text-text">
                {data.data.tracking_number}
              </span>
              <button
                className="cursor-pointer"
                onClick={() => copyText(data.data.tracking_number)}
              >
                <Copy className="size-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
