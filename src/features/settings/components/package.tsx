import packageIcon from "@/assets/package.svg";
import { Edit, Trash2 } from "lucide-react";

export default function Package({ packaging }: { packaging: Packaging }) {
  return (
    <div className="border rounded-lg px-6 py-4 flex justify-between items-center">
      <div className=" flex items-center gap-4">
        <img src={packageIcon} className="size-12" />
        <div className="flex flex-col gap-0.5 text-xs font-normal text-gray-500">
          <h5 className="text-sm font-medium text-text">{packaging.name}</h5>
          <p>Dimensions: 10cm x 10cm x 10cm</p>
          <span>Weight: 0.2kg</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button>
          <Edit className="size-4 text-primary" />
        </button>
        <button>
          <Trash2 className="size-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}
