import Paginator from "@/components/paginator";
import TableLoader from "@/components/table-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAddressList from "@/features/address/api/useAddressList";
import { columns } from "@/features/address/columns";
import { DataTable } from "@/features/address/components/data-table";
import { useNewAddress } from "@/features/address/hooks/use-new-address";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "react-use";
export default function AddressList() {
  const { onOpen } = useNewAddress();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search");

  const [searchInput, setSearchInput] = useState(search || "");
  const [debouncedValue, setDebouncedValue] = useState(search || "");

  useDebounce(
    () => {
      setDebouncedValue(searchInput);
      if (searchInput) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("search", debouncedValue); // Add/update 'search' param
        setSearchParams(newSearchParams);
      } else {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("search"); // Remove 'search' param if empty
        setSearchParams(newSearchParams);
      }
    },
    1500,
    [searchInput]
  );

  const { data, isLoading, isError } = useAddressList({
    page: currentPage,
    search: debouncedValue,
  });
  return (
    <div className="bg-white w-full p-8 space-y-8 ">
      <div className="flex flex-col md:flex-row md:justify-end gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Button
            className="w-full md:w-fit flex items-center gap-2"
            onClick={onOpen}
          >
            <Plus className="size-4 text-current" />
            Create address
          </Button>
          <Input
            value={searchInput || ""}
            onChange={({ currentTarget }) => {
              setSearchInput(currentTarget.value);
            }}
            placeholder="Search..."
            className="py-2 h-11 w-full lg:w-56"
          />
        </div>
      </div>
      {isLoading && <TableLoader />}
      {data && (
        <>
          <div>
            <DataTable columns={columns} data={data.data.addresses} />
          </div>

          <Paginator pagination={data.data.pagination} />
        </>
      )}

      {isError && (
        <div className="flex justify-center items-center py-24">
          <p className="text-sm font-medium text-destructive">
            Failed to load addresses
          </p>
        </div>
      )}
    </div>
  );
}
