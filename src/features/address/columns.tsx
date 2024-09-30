import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Address>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span>{format(row.original.date, "dd/MM/yy")}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <span className="inline-block w-36">{row.original.name}</span>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-36">{row.original.phoneNumber}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <span className="inline-block w-36">{row.original.email}</span>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-full line-clamp-1">
          {row.original.location}
        </span>
      );
    },
  },
];
