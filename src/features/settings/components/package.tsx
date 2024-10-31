import packageIcon from "@/assets/package.svg";
import { Edit, Trash2 } from "lucide-react";
import { useEditPackage } from "../hooks/use-edit-package";

export default function Package({ packaging }: { packaging: Packaging }) {
  const { onOpen } = useEditPackage();
  return (
    <div className="border rounded-lg px-6 py-4 flex justify-between items-center gap-4">
      <div className=" flex items-center gap-4">
        <img src={packageIcon} className="size-12" />
        <div className="flex flex-col gap-0.5 text-xs font-normal text-gray-500">
          <h5 className="text-sm font-medium text-text">{packaging.name}</h5>
          <p className="line-clamp-1">
            Dimensions: {packaging.length}
            {packaging.size_unit.toLowerCase()} x {packaging.width}
            {packaging.size_unit.toLowerCase()} x {packaging.height}
            {packaging.size_unit.toLowerCase()}
          </p>
          <span>
            Weight: {packaging.weight}
            {packaging.weight_unit.toLowerCase()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => onOpen(packaging.id)}>
          <Edit className="size-4 text-primary" />
        </button>

        <button>
          <Trash2 className="size-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}
