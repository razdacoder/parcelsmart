import AppNavBar from "@/components/app-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { columns } from "@/features/address/columns";
import { DataTable } from "@/features/address/components/data-table";
import { useNewAddress } from "@/features/address/hooks/use-new-address";
import { addresses } from "@/lib/demo";

export default function AddressBook() {
  const { onOpen } = useNewAddress();
  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      <AppNavBar title="Address Book" />
      <main className="px-4 md:px-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-text">All Addresses</h3>

          <div className="bg-white w-full p-8 space-y-2">
            <div className="flex flex-col lg:flex-row md:justify-end gap-3">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <Button onClick={onOpen}>Create address</Button>
                <Input
                  placeholder="Search..."
                  className="py-2 h-11 w-full md:w-1/2 lg:w-56"
                />
              </div>
            </div>
            <div>
              <DataTable columns={columns} data={addresses} />
            </div>

            <Pagination className="md:justify-end mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="text-primary hover:text-primary"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="text-primary hover:text-primary"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}
