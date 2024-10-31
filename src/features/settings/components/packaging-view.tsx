import { Button } from "@/components/ui/button";
import useGetPackaging from "@/features/shipment/api/useGetPackaging";
import { Loader, Plus } from "lucide-react";
import { useNewPackage } from "../hooks/use-new-package";
import Package from "./package";

export default function PackagingView() {
  const { data, isLoading } = useGetPackaging();
  const { onOpen } = useNewPackage();
  return (
    <>
      {isLoading && (
        <div className="py-12 flex items-center justify-center">
          <Loader className="text-primary animate-spin size-6" />
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-2">
          {data.data.packaging.map((p) => (
            <Package key={p.id} packaging={p} />
          ))}
        </div>
      )}

      {data?.data.packaging.length === 0 && (
        <div className="py-12 flex items-center justify-center flex-col gap-4">
          <p>No Packaging yet.</p>
          <Button onClick={onOpen} className="flex items-center gap-2">
            <Plus className="size-4" />
            Add Packaging
          </Button>
        </div>
      )}
    </>
  );
}
