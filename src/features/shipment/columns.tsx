import sourceImg from "@/assets/t.svg";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpRight, Copy } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<Shipmnet>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-56">
          <ArrowUpRight className="size-5 text-primary" />
          <span>{format(row.original.date, "d MMM, hh.mm a")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "reciever",
    header: "Reciever",
    cell: ({ row }) => {
      return <span className="inline-block w-36">{row.original.reciever}</span>;
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-36">{row.original.destination}</span>
      );
    },
  },
  {
    accessorKey: "shipmentId",
    header: "Shipment ID",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-36">
          <span>{row.original.shipmentId}</span>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(row.original.shipmentId);
              toast.success("Copied to clipboard");
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
    cell: () => {
      return (
        <div className="w-36">
          <img src={sourceImg} alt="Source Image" />
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
          {formatNaira(row.original.price)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.status === "in-transit") {
        return (
          <Badge className="bg-[#CB6F1B26] py-2 px-3 text-[#CB6F1B] w-36 flex justify-center hover:bg-[#CB6F1B26] hover:text-[#CB6F1B]">
            In Transit
          </Badge>
        );
      }
      if (row.original.status === "canceled") {
        return (
          <Badge className="bg-[#FDF2F8] py-2 px-3 text-[#ED4F9D] w-36 flex justify-center hover:bg-[#FDF2F8] hover:text-[#ED4F9D]">
            Cancelled
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

      if (row.original.status === "completed") {
        return (
          <Badge className="bg-[#EFF6FF] py-2 px-3 text-[#2563EB] w-36 flex justify-center hover:bg-[#EFF6FF] hover:text-[#2563EB]">
            Completed
          </Badge>
        );
      }
    },
  },
];
