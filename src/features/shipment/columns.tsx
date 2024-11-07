import { Badge } from "@/components/ui/badge";
import { copyText, formatNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpRight, Copy, Minus } from "lucide-react";

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-56">
          <ArrowUpRight className="size-5 text-primary" />
          <span>{format(row.original.created_at, "d MMM, hh.mm a")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "reciever",
    header: "Reciever",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-36">
          {row.original.destination_address.first_name}{" "}
          {row.original.destination_address.last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      return (
        <>
          {row.original.rate ? (
            <span className="inline-block w-36 truncate">
              {row.original.rate.destination_address.line_1}{" "}
              {row.original.rate.destination_address.city}{" "}
              {row.original.rate.destination_address.state},{" "}
              {row.original.rate.destination_address.country}
            </span>
          ) : (
            <span className="inline-block w-36 truncate">
              {row.original.destination_address.line_1}{" "}
              {row.original.destination_address.city}{" "}
              {row.original.destination_address.state},{" "}
              {row.original.destination_address.country}
            </span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "shipmentId",
    header: "Shipment ID",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-36">
          <span className="truncate flex-1">
            {row.original.tracking_number || row.original.id}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyText(row.original.tracking_number || row.original.id);
            }}
          >
            <Copy className="size-4 text-primary" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      return (
        <div className="w-36">
          {row.original.rate ? (
            <img
              src={row.original.rate?.carrier_logo}
              alt="Source Image"
              className="size-6"
            />
          ) : (
            <Minus className="size-6 text-primary" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <span className="text-primary w-36 inline-block">
          {row.original.rate ? (
            formatNaira(row.original.rate.amount)
          ) : (
            <Minus className="size-6 text-primary" />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.status === "in_transit") {
        return (
          <Badge className="bg-[#CB6F1B26] py-2 px-3 text-[#CB6F1B] w-36 flex justify-center hover:bg-[#CB6F1B26] hover:text-[#CB6F1B]">
            In Transit
          </Badge>
        );
      }
      if (row.original.status === "cancelled") {
        return (
          <Badge className="bg-[#FDF2F8] py-2 px-3 text-[#ED4F9D] w-36 flex justify-center hover:bg-[#FDF2F8] hover:text-[#ED4F9D]">
            Cancelled
          </Badge>
        );
      }

      if (row.original.status === "delivered") {
        return (
          <Badge className="bg-[#E0FEE9B2] py-2 px-3 text-[#24D164] w-36 flex justify-center hover:bg-[#E0FEE9B2] hover:text-[#24D164]">
            Delivered
          </Badge>
        );
      }

      if (row.original.status === "draft") {
        return (
          <Badge className="bg-[#D6D8D9] py-2 px-3 text-[#4F4F4F] w-36 flex justify-center hover:bg-[#D6D8D9] hover:text-[#4F4F4F]">
            Draft
          </Badge>
        );
      }

      if (row.original.status === "confirmed") {
        return (
          <Badge className="bg-[#EFF6FF] py-2 px-3 text-[#2563EB] w-36 flex justify-center hover:bg-[#EFF6FF] hover:text-[#2563EB]">
            Confirmed
          </Badge>
        );
      }

      if (row.original.status === "pending") {
        return (
          <Badge className="bg-yellow-500 py-2 px-3 w-36 flex justify-center hover:bg-yellow-600 hover:text-white">
            Pending
          </Badge>
        );
      }
    },
  },
];
