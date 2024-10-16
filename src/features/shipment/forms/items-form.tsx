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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCreateParcel, { ParcelRequestType } from "../api/useCreateParcel";
import useCreateShipment from "../api/useCreateShipment";
import useGetPackaging from "../api/useGetPackaging";
import useUpdateParcel from "../api/useUpdateParcel";
import useUpdateShipment from "../api/useUpdateShipment";
import { useEditItemModal } from "../hooks/use-edit-item-modal";
import { useNewItemModal } from "../hooks/use-new-item-modal";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function ItemsForm({
  next,
  prev,
  parcelsToEdit,
}: StepsProps & { parcelsToEdit?: Parcel[] }) {
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
    addParcelId,
    deleteParcelId,
    addItem,
    deleteItem,
    parcels_id,
    shipmentID,
    newParcel,
    deleteParcel,
  } = useShipmentApplication();

  const { data, isLoading } = useGetPackaging();
  const { mutateAsync: createParcel, isPending: creating } = useCreateParcel();
  const { mutateAsync: updateParcelFn, isPending: updating } =
    useUpdateParcel();
  const { mutateAsync: createShipment, isPending: creatingShipment } =
    useCreateShipment();
  const { mutateAsync: updateShipment, isPending: updaingShipment } =
    useUpdateShipment();
  const [AlertModal, confirm] = useAlertModal({
    type: "warning",
    title: "Upload Missing Documents.",
    message:
      "Provide proof of purchase for your shipment. Upload a valid payment receipt or a transaction receipt.",
    primaryLabel: "Upload",
    secondaryLabel: "Skip",
  });

  const isResuming = Boolean(parcelsToEdit) || parcels_id.length;
  const [packaging, setPackaging] = useState<string>();

  const isPending = creating || creatingShipment || updating || updaingShipment;
  const isCreating =
    creating || creatingShipment || updating || updaingShipment;

  useEffect(() => {
    if (parcelsToEdit) {
      parcelsToEdit.forEach((parcel, index) => {
        const newPackaging = {
          id: parcel.packaging_id,
          value:
            data?.data.packaging.find(
              (p) => p.packaging_id === parcel.packaging_id
            )?.name || "",
        };
        updateParcel(0, newPackaging, "NGN");
        setPackaging(`${newPackaging.id}_${newPackaging.value}`);

        if (parcels[index].items.length === 0) {
          parcel.items.forEach((item) => {
            addItem(0, {
              itemType: "items",
              weight: item.weight,
              name: item.name,
              hsCode: item.hs_code,
              value: item.value,
              category: "",
              subCategory: "",
              quantity: item.quantity,
            });
          });
        }

        if (parcels_id.length === 0) {
          addParcelId(parcel.id);
        }
      });
    }
  }, [parcelsToEdit]);

  async function createPrcelsandShipment() {
    const parcelCreationPromises = parcels.map((parcel, index) => {
      const values: ParcelRequestType = {
        description: `Parcel ${index + 1}`,
        packaging_id: parcel.packaging,
        weight_unit: "kg",
        items: parcel.items.map((item) => ({
          description: `${item.name} description`,
          name: item.name,
          quantity: item.quantity,
          value: item.itemType === "items" ? item.value : 1000000,
          hs_code: item.itemType === "items" ? item.hsCode : "49011000",
          weight: item.weight,
          currency: parcel.currency,
        })),
      };

      return createParcel(values).then((data) => data.data.id);
    });

    const results = await Promise.allSettled(parcelCreationPromises);

    const parcelIds = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    parcelIds.forEach((id) => addParcelId(id));

    if (parcelIds.length !== parcels.length) {
      console.error("Failed to create some parcels:", results);
    }

    createShipment(
      {
        origin_address_id: sender?.id!,
        destination_address_id: receiver?.id!,
        parcel_ids: parcelIds,
        purpose: "personal",
      },
      {
        onSuccess: (data) => {
          setShipmentID(data.data.id);
          next?.();
        },
      }
    );
  }

  async function updateParcelsandShipment() {
    const existingParcelIds = parcels_id;
    const newParcels = parcels.filter((_, index) => !existingParcelIds[index]);

    // Create new parcels
    const newParcelPromises = newParcels.map((parcel) => {
      const values: ParcelRequestType = {
        description: `Parcel ${parcels.indexOf(parcel) + 1}`,
        packaging_id: parcel.packaging,
        weight_unit: "kg",
        items: parcel.items.map((item) => ({
          description: `${item.name} description`,
          name: item.name,
          quantity: item.quantity,
          value: item.itemType === "items" ? item.value : 1000000,
          hs_code: item.itemType === "items" ? item.hsCode : "49011000",
          weight: item.weight,
          currency: parcel.currency,
        })),
      };

      return createParcel(values).then((data) => {
        addParcelId(data.data.id); // Update parcel IDs in state
        return data.data.id;
      });
    });

    const existingParcelPromises = parcels
      .filter((_, index) => existingParcelIds[index])
      .map((parcel, index) => {
        const values: ParcelRequestType = {
          description: `Parcel ${index + 1}`,
          packaging_id: parcel.packaging,
          weight_unit: "kg",
          items: parcel.items.map((item) => ({
            description: `${item.name} description`,
            name: item.name,
            quantity: item.quantity,
            value: item.itemType === "items" ? item.value : 1000000,
            hs_code: item.itemType === "items" ? item.hsCode : "49011000",
            weight: item.weight,
            currency: parcel.currency,
          })),
        };

        return updateParcelFn({ id: existingParcelIds[index], values }).then(
          (data) => data.data.id
        );
      });

    const results = await Promise.allSettled([
      ...newParcelPromises,
      ...existingParcelPromises,
    ]);

    const parcelIds = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    parcels_id.forEach((id) => deleteParcelId(id));
    parcelIds.forEach((id) => addParcelId(id));

    if (parcelIds.length !== parcels.length) {
      console.error("Failed to update some parcels:", results);
    }

    updateShipment(
      {
        id: shipmentID!,
        values: {
          origin_address_id: sender?.id!,
          destination_address_id: receiver?.id!,
          parcel_ids: parcelIds,
          purpose: "personal",
        },
      },
      {
        onSuccess: () => {
          next?.();
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
        isResuming ? updateParcelsandShipment() : createPrcelsandShipment();
      }
    } else {
      isResuming ? updateParcelsandShipment() : createPrcelsandShipment();
    }
  }

  const isValidToSubmit = parcels.every(
    (parcel) => !!parcel.packaging && parcel.items.length > 0
  );

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
          <div key={`parcel-${index}`} className="flex flex-col bg-[#F4FDF8]">
            <div className="py-4 px-6 rounded-t-xl bg-[#5F9EA0] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg ">
                  <Package className="size-6 md:size-8 text-primary " />
                </div>
                <h3 className="text-sm md:text-base text-white font-semibold">
                  Parcel {index + 1}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onOpen(index)}
                  className="gap-2 text-primary text-sm"
                  variant="secondary"
                >
                  <Plus className="size-3.5 md:size-5" />
                  Add Item
                </Button>
                {parcels.length > 1 && (
                  <Button
                    onClick={() => {
                      deleteParcel(index);
                      deleteParcelId(parcels_id.find((_, i) => i === index)!);
                    }}
                    className="gap-2 text-sm"
                    variant="destructive"
                  >
                    <XCircle className="size-3.5 md:size-5" />
                    Remove Parcel
                  </Button>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="packaging">Select Packaging</Label>
                    <Select
                      disabled={isLoading || isPending}
                      defaultValue={
                        isResuming ? packaging : parcels[index].packaging
                      }
                      onValueChange={(value) => {
                        const p = value.split("_");
                        updateParcel(
                          index,
                          { id: p[0], value: p[1] },
                          undefined
                        );
                      }}
                    >
                      <SelectTrigger id="packaging" className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.data.packaging.map((packaging) => (
                          <SelectItem
                            value={`${packaging.packaging_id}_${packaging.name}`}
                          >
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
                        <button onClick={() => deleteItem(index, item_index)}>
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
        {!isResuming && (
          <Button
            onClick={newParcel}
            disabled={isPending}
            className="bg-[#5F9EA0] w-full h-20 justify-start items-center gap-4 font-semibold rounded-xl text-sm md:text-base"
            size="lg"
          >
            <div className="p-3 bg-white rounded-lg">
              <PackagePlus className="stroke-primary size-6 stroke-2" />
            </div>
            Click to add new parcel
          </Button>
        )}

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
            disabled={isPending || !isValidToSubmit}
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
