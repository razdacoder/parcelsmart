import { cn, formatNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Copy, MoveDown, MoveUp } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 w-56">
          {row.original.type === "credit" ? (
            <MoveDown className="size-5 text-primary" />
          ) : (
            <MoveUp className="size-5 text-destructive" />
          )}
          <span>{format(row.original.created_at, "d MMM, hh.mm a")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-48 truncate">
          {row.original.description}
        </span>
      );
    },
  },

  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-36">
          <span className="truncate">{row.original.reference}</span>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(row.original.reference);
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
    accessorKey: "price",
    header: () => {
      return <div className="w-full text-right">Amount</div>;
    },
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            "w-full inline-block text-right",
            row.original.type === "credit" ? "text-primary" : "text-destructive"
          )}
        >
          {formatNaira(parseFloat(row.original.amount))}
        </span>
      );
    },
  },
];
