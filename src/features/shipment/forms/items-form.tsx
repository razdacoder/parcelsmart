import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parcelListSchema, ParcelListValues } from "@/lib/schemas";
import { formatNaira } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Edit,
  Eye,
  File,
  Package,
  PackagePlus,
  Plus,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNewItemModal } from "../hooks/use-new-item-modal";

export default function ItemsForm() {
  const navigate = useNavigate();
  const { onOpen } = useNewItemModal();
  const { register, getValues } = useForm<ParcelListValues>({
    resolver: zodResolver(parcelListSchema),
    defaultValues: {
      parcels: [
        {
          packaging: "default",
          currency: "NGN",
          items: [
            {
              itemType: "items",
              name: "HP Laptop",
              category: "Electronics",
              subCategory: "",
              hsCode: "888",
              weight: 25,
              quantity: 3,
              value: 900000,
            },
            {
              itemType: "items",
              name: "Lenovo Laptop",
              category: "Electronics",
              subCategory: "",
              hsCode: "888",
              weight: 25,
              quantity: 3,
              value: 900000,
            },
          ],
        },
      ],
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-text">Add Items</h3>
          <p className="text-sm text-muted-foreground">
            What is in your shipment
          </p>
        </div>
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <XCircle className="size-6" />
        </button>
      </div>
      {getValues("parcels").map((_, index) => (
        <div key={`percel-${index}`} className="flex flex-col bg-[#F4FDF8]">
          <div className="py-4 px-6 rounded-t-xl bg-[#5F9EA0] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg ">
                <Package className="size-6 md:size-8 text-primary " />
              </div>
              <h3 className="text-sm md:text-base text-white font-semibold">
                Parcel 1
              </h3>
            </div>
            <Button
              onClick={onOpen}
              className="gap-2 text-primary text-sm"
              variant="secondary"
            >
              <Plus className="size-3.5 md:size-5" />
              Add Item
            </Button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="packaging">Select Packaging</Label>
                  <Select
                    defaultValue="packaging"
                    {...register(`parcels.${index}.packaging`)}
                  >
                    <SelectTrigger id="packaging" className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">
                        Parcelsmart Default Standard
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="packaging">Select Currency</Label>
                  <Select
                    defaultValue="NGN"
                    {...register(`parcels.${index}.currency`)}
                  >
                    <SelectTrigger id="packaging" className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">Nigeria Naira (N)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {getValues(`parcels.${index}.items`).map((item, item_index) => (
                <div
                  key={`parcel-${index}-item-${item_index}`}
                  className="bg-white p-4 rounded-lg"
                >
                  <div className="grid grid-cols-12 text-xs md:text-sm font-medium gap-2">
                    <span className="col-span-4 line-clamp-1">{item.name}</span>
                    <span className="md:col-span-2 hidden md:inline-block">
                      {item.quantity}pcs
                    </span>
                    <span className="md:col-span-2 hidden md:inline-block">
                      {item.weight}kg
                    </span>
                    <span className="col-span-4 md:col-span-2">
                      {item.itemType === "items" && formatNaira(item.value)}
                    </span>
                    <div className="col-span-4 md:col-span-2 flex justify-end items-center gap-2">
                      <button>
                        <Edit className="size-4 text-primary" />
                      </button>
                      <button>
                        <Trash2 className="size-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-4 px-6 rounded-t-xl bg-[#5F9EA0] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg ">
                <Upload className="size-6 md:size-8 text-primary " />
              </div>
              <h3 className="text-sm md:text-base text-white font-semibold">
                Click to upload Proof of Purchase
              </h3>
            </div>
          </div>
          <div className="p-4">
            <div className="p-4 bg-white rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <File className="text-blue-500" />
                <div className="flex flex-col text-xs ">
                  <h6 className="font-semibold text-text">Proof of Purchase</h6>
                  <p className="text-muted-foreground">50kb</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  <Eye className="size-4 text-primary" />
                </button>
                <button>
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
          <div className="py-4 px-6 rounded-t-xl bg-[#5F9EA0] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg ">
                <Upload className="size-6 md:size-8 text-primary " />
              </div>
              <h3 className="text-sm md:text-base text-white font-semibold line-clamp-2">
                Click to add an image of your parcel on a scale or with
                measuring tape
              </h3>
            </div>
          </div>
          <div className="p-4">
            <div className="p-4 bg-white rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <File className="text-blue-500" />
                <div className="flex flex-col text-xs ">
                  <h6 className="font-semibold text-text">
                    Reconciliation document
                  </h6>
                  <p className="text-muted-foreground">50kb</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  <Eye className="size-4 text-primary" />
                </button>
                <button>
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button
        className="bg-[#5F9EA0] w-full h-20 justify-start items-center gap-4 font-semibold rounded-xl text-sm md:text-base"
        size="lg"
      >
        <div className="p-3 bg-white rounded-lg">
          <PackagePlus className="stroke-primary size-6 stroke-2" />
        </div>
        Click to add new parcel
      </Button>
    </div>
  );
}
