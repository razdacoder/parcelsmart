import { useAlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNaira } from "@/lib/utils";
import {
  Edit,
  Eye,
  File,
  Loader,
  Package,
  PackagePlus,
  Plus,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useCreateParcel, { ParcelRequestType } from "../api/useCreateParcel";
import useCreateShipment from "../api/useCreateShipment";
import useGetPackaging from "../api/useGetPackaging";
import { useEditItemModal } from "../hooks/use-edit-item-modal";
import { useNewItemModal } from "../hooks/use-new-item-modal";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function ItemsForm({ next, prev }: StepsProps) {
  const navigate = useNavigate();
  const { onOpen } = useNewItemModal();
  const { onOpen: openEdit } = useEditItemModal();
  const {
    sender,
    receiver,
    clearAll,
    parcels,
    updateParcel,
    deleteProofOfPayment,
    deleteProofOfWeight,
    setShipmentID,
  } = useShipmentApplication();

  const { data, isLoading } = useGetPackaging();
  const { mutate: createParcel, isPending: creating } = useCreateParcel();
  const { mutate: createShipment, isPending: creatingShipment } =
    useCreateShipment();
  const [AlertModal, confirm] = useAlertModal({
    type: "warning",
    title: "Upload Missing Documents.",
    message:
      "Provide proof of purchase for your shipment. Upload a valid payment receipt or a transaction receipt.",
    primaryLabel: "Upload",
    secondaryLabel: "Skip",
  });

  const isPending = creating || creatingShipment;
  const isCreating = creating || creatingShipment;

  async function createPrcelsandShipment() {
    const parcelIds: string[] = [];

    const parcelRequests = parcels.map((parcel, index) => {
      const values: ParcelRequestType = {
        description: `Parcel ${index + 1}`,
        packaging_id: parcel.packaging,
        weight_unit: "kg",
        items: parcel.items.map((item) => ({
          description: `${item.name} description`,
          name: item.name,
          quantity: item.quantity,
          value: item.itemType === "items" ? item.value : 1000000, // Decide by Company
          hs_code: item.itemType === "items" ? item.hsCode : "49011000", // Decide Later
          weight: item.weight,
          currency: parcel.currency,
        })),
      };

      // Return a promise for each parcel creation request
      return new Promise<void>((resolve) => {
        createParcel(values, {
          onSuccess: (data) => {
            parcelIds.push(data.data.id);
            resolve();
          },
        });
      });
    });

    // Wait for all parcel creation promises to resolve
    await Promise.all(parcelRequests);

    // Now, create the shipment with all parcel IDs
    createShipment(
      {
        origin_address_id: sender?.id!,
        destination_address_id: receiver?.id!,
        parcel_id: parcelIds.at(0)!, // Should be populated at this point
        purpose: "personal",
      },
      {
        onSuccess: (data) => {
          setShipmentID(data.data.id);
          next();
        },
      }
    );
  }

  async function onSubmit() {
    if (
      parcels.some(
        (parcel) =>
          parcel.proofOfPayment.length === 0 ||
          parcel.proofOfWeight.length === 0
      )
    ) {
      const ok = await confirm();
      if (!ok) {
        createPrcelsandShipment();
      }
    } else {
      createPrcelsandShipment();
    }
  }

  return (
    <>
      <AlertModal />
      <div className="space-y-6">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-bold text-text">
              Add Items
            </h3>
            <p className="text-sm text-muted-foreground">
              What is in your shipment
            </p>
          </div>
          <button
            onClick={() => {
              clearAll();
              navigate(-1);
            }}
            className="cursor-pointer"
          >
            <XCircle className="size-6" />
          </button>
        </div>
        {parcels.map((parcel, index) => (
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
                onClick={() => onOpen(index)}
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
                      disabled={isLoading || isPending}
                      defaultValue={parcels[index].packaging}
                      onValueChange={(value) =>
                        updateParcel(index, value, undefined)
                      }
                    >
                      <SelectTrigger id="packaging" className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.data.packaging.map((packaging) => (
                          <SelectItem value={packaging.packaging_id}>
                            {packaging.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="packaging">Select Currency</Label>
                    <Select
                      defaultValue="NGN"
                      disabled={isPending}
                      onValueChange={(value) =>
                        updateParcel(
                          index,
                          undefined,
                          value as "NGN" | "USD" | "GBP"
                        )
                      }
                    >
                      <SelectTrigger id="packaging" className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">Nigeria Naira (N)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {parcel.items.map((item, item_index) => (
                  <div
                    key={`parcel-${index}-item-${item_index}`}
                    className="bg-white p-4 rounded-lg"
                  >
                    <div className="grid grid-cols-12 text-xs md:text-sm font-medium gap-2">
                      <span className="col-span-4 line-clamp-1">
                        {item.name}
                      </span>
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
                        <button onClick={() => openEdit(index, item_index)}>
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
              <Button
                disabled={isPending}
                size="sm"
                variant="secondary"
                className="px-6 text-primary h-10"
              >
                Upload
              </Button>
            </div>
            <div className="p-4 space-y-2">
              {parcel.proofOfPayment.map((proof, proof_index) => (
                <div className="p-4 bg-white rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <File className="text-blue-500" />
                    <div className="flex flex-col text-xs ">
                      <h6 className="font-semibold text-text">
                        Proof of Purchase {index + 1}
                      </h6>
                      <p className="text-muted-foreground">50kb</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={proof}>
                      <Eye className="size-4 text-primary" />
                    </Link>
                    <button
                      disabled={isPending}
                      onClick={() => deleteProofOfPayment(index, proof_index)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
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
              <Button
                size="sm"
                variant="secondary"
                className="px-6 text-primary h-10"
              >
                Upload
              </Button>
            </div>
            <div className="p-4 space-y-2">
              {parcel.proofOfWeight.map((proof, proof_index) => (
                <div className="p-4 bg-white rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <File className="text-blue-500" />
                    <div className="flex flex-col text-xs ">
                      <h6 className="font-semibold text-text">
                        Reconciliation document {index + 1}
                      </h6>
                      <p className="text-muted-foreground">50kb</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={proof}>
                      <Eye className="size-4 text-primary" />
                    </Link>
                    <button
                      disabled={isPending}
                      onClick={() => deleteProofOfWeight(index, proof_index)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button
          disabled={isPending}
          className="bg-[#5F9EA0] w-full h-20 justify-start items-center gap-4 font-semibold rounded-xl text-sm md:text-base"
          size="lg"
        >
          <div className="p-3 bg-white rounded-lg">
            <PackagePlus className="stroke-primary size-6 stroke-2" />
          </div>
          Click to add new parcel
        </Button>

        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
          <Button
            type="button"
            disabled={isPending}
            onClick={() => prev?.()}
            size="lg"
            className="bg-[#E2FAEC] text-primary shadow-none w-full md:w-fit hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
          >
            Previous
          </Button>

          <Button
            onClick={() => onSubmit()}
            disabled={isPending}
            size="lg"
            className="px-12 w-full md:w-fit"
          >
            {isCreating ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
