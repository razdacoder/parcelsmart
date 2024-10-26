import { useAlertModal } from "@/components/alert-modal";
import { PSelect } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ItemValues, ParcelValues } from "@/lib/schemas";
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
import { useEffect } from "react";
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
    deleteParcelId,
    deleteItem,
    parcels_id,
    shipmentID,
    newParcel,
    deleteParcel,
    setNewIDS,
    // setItems
    setParcels,
  } = useShipmentApplication();

  const { data, isLoading } = useGetPackaging();
  const { mutateAsync: createParcel, isPending: creating } = useCreateParcel();
  const { mutateAsync: updateParcelFn, isPending: updating } =
    useUpdateParcel();
  const { mutateAsync: createShipment, isPending: creatingShipment } =
    useCreateShipment();
  const { mutateAsync: updateShipment, isPending: updatingShipment } =
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

  const isPending =
    creating || creatingShipment || updating || updatingShipment;
  const isCreating =
    creating || creatingShipment || updating || updatingShipment;

  useEffect(() => {
    if (parcelsToEdit) {
      const editingParcels: ParcelValues[] = parcelsToEdit.map((parcel) => {
        const newPackaging = {
          id: parcel.packaging_id,
          value:
            data?.data.packaging.find(
              (p) => p.packaging_id === parcel.packaging_id
            )?.name || "",
        };

        const items: ItemValues[] = parcel.items.map((item) => {
          const itemValue: ItemValues =
            item.hs_code === import.meta.env.VITE_DOCUMENT_HSCODE
              ? {
                  itemType: "documents",
                  name: item.name,
                  quantity: item.quantity,
                  description: item.description,
                  weight: item.weight,
                }
              : {
                  itemType: "items",
                  weight: item.weight,
                  name: item.name,
                  description: item.description,
                  hsCode: item.hs_code,
                  value: item.value,
                  category: "",
                  subCategory: "",
                  quantity: item.quantity,
                };

          return itemValue;
        });
        return {
          packaging: newPackaging.id,
          packaging_value: newPackaging.value,
          proofOfPayment: parcel.proof_of_payments,
          proofOfWeight: [], // TODO: Change to proof of weight
          currency: "NGN",
          items,
        };
      });
      setParcels(editingParcels);
      setNewIDS(parcelsToEdit.map((parcel) => parcel.id));
    } else {
      setParcels([
        {
          packaging: "",
          packaging_value: "",
          items: [],
          proofOfPayment: [],
          proofOfWeight: [],
          currency: "NGN",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcelsToEdit]);


  async function createParcelsAndShipment() {
    const parcelCreationPromises = parcels.map((parcel, index) => {
      const values: ParcelRequestType = {
        description: `Parcel ${index + 1}`,
        packaging_id: parcel.packaging,
        weight_unit: "kg",
        items: parcel.items.map((item) => ({
          description: item.description,
          name: item.name,
          quantity: item.quantity,
          value:
            item.itemType === "items"
              ? item.value
              : Number(import.meta.env.VITE_DOCUMENT_VALUE),
          hs_code:
            item.itemType === "items"
              ? item.hsCode
              : import.meta.env.VITE_DOCUMENT_HSCODE,
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

    setNewIDS(parcelIds);

    if (parcelIds.length !== parcels.length) {
      console.error("Failed to create some parcels:", results);
    }

    if (sender && receiver) {
      await createShipment(
          {
            origin_address_id: sender.id,
            destination_address_id: receiver.id,
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
  }

  async function updateParcelsAndShipment() {
    const existingParcelIds = parcels_id;

    // Identify new parcels (no ID yet) and existing parcels (with ID)
    const newParcels = parcels.filter((_, index) => !existingParcelIds[index]);
    const existingParcels = parcels.filter(
      (_, index) => existingParcelIds[index]
    );

    // Create new parcels
    const newParcelPromises = newParcels.map((parcel, index) => {
      const values: ParcelRequestType = {
        description: `Parcel ${index + 1}`,
        packaging_id: parcel.packaging,
        weight_unit: "kg",
        items: parcel.items.map((item) => ({
          description: item.description,
          name: item.name,
          quantity: item.quantity,
          value:
            item.itemType === "items"
              ? item.value
              : Number(import.meta.env.VITE_DOCUMENT_VALUE),
          hs_code:
            item.itemType === "items"
              ? item.hsCode
              : import.meta.env.VITE_DOCUMENT_HSCODE,
          weight: item.weight,
          currency: parcel.currency,
        })),
      };

      return createParcel(values).then((data) => data.data.id);
    });

    // Update existing parcels
    const existingParcelPromises = existingParcels.map((parcel, index) => {
      const values: ParcelRequestType = {
        description: `Parcel ${index + 1}`,
        packaging_id: parcel.packaging,
        weight_unit: "kg",
        items: parcel.items.map((item) => ({
          description: item.description,
          name: item.name,
          quantity: item.quantity,
          value:
            item.itemType === "items"
              ? item.value
              : Number(import.meta.env.VITE_DOCUMENT_VALUE),
          hs_code:
            item.itemType === "items"
              ? item.hsCode
              : import.meta.env.VITE_DOCUMENT_HSCODE,
          weight: item.weight,
          currency: parcel.currency,
        })),
      };

      // Use the existing parcel ID
      return updateParcelFn({ id: existingParcelIds[index], values }).then(
        (data) => data.data.id
      );
    });

    // Wait for all create/update operations to complete
    const results = await Promise.allSettled([
      ...newParcelPromises,
      ...existingParcelPromises,
    ]);

    // Collect all successfully updated/created parcel IDs
    const parcelIds = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    setNewIDS(parcelIds);

    // Ensure to update only parcels that were successfully created/updated
    if (parcelIds.length !== parcels.length) {
      console.error("Failed to update some parcels:", results);
    }

    // Update the shipment with the new parcel IDs
    if (sender && receiver && shipmentID) {
      updateShipment(
        {
          id: shipmentID,
          values: {
            origin_address_id: sender.id,
            destination_address_id: receiver.id,
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
        if (isResuming) {
          await updateParcelsAndShipment();
        } else {
          await createParcelsAndShipment();
        }
      }
    } else {
      if (isResuming) {
        await updateParcelsAndShipment();
      } else {
        await createParcelsAndShipment();
      }
    }
  }

  const isValidToSubmit = parcels.every(
    (parcel) => !!parcel.packaging && parcel.items.length > 0
  );

  const packagingOptions = data?.data.packaging.map((p) => ({
    label: p.name,
    value: `${p.packaging_id}_${p.name}`,
  }));

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
                    <PSelect
                      value={`${parcel.packaging}_${parcel.packaging_value}`}
                      isLoading={isLoading}
                      placeholder="Select Packaging"
                      options={packagingOptions}
                      onChange={(value) => {
                        if (value) {
                          const p = value.split("_");
                          updateParcel(
                            index,
                            { id: p[0], value: p[1] },
                            undefined
                          );
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="packaging">Select Currency</Label>
                    <PSelect
                      value={parcel.currency}
                      isLoading={isLoading}
                      placeholder="Select Cunrrency"
                      options={[{ value: "NGN", label: "Nigeria Naira (N)" }]}
                      onChange={(value) => {
                        if (value) {
                          updateParcel(
                            index,
                            undefined,
                            value as "NGN" | "USD" | "GBP"
                          );
                        }
                      }}
                    />
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
                <div
                  key={`proof-of-payment-${proof_index}`}
                  className="p-4 bg-white rounded-lg flex items-center justify-between"
                >
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
                <div
                  key={`proof-of-weight-${proof_index}`}
                  className="p-4 bg-white rounded-lg flex items-center justify-between"
                >
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
