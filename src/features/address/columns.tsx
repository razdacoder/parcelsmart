import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<AddressBook>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span>{format(row.original.created_at, "dd/MM/yy")}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-36">
          {row.original.first_name} {row.original.last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-36">{row.original.phone_number}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-64 line-clamp-1">
          {row.original.email}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-full line-clamp-1">
          {row.original.line_1}, {row.original.city}, {row.original.state},
          {row.original.country}
        </span>
      );
    },
  },
];
