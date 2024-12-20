import { PSelect } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { itemSchema, ItemValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useHSCodesValues from "../api/get-hs-code-values";
import useHSCodeCategories from "../api/useHSCodeCategories";
import useHSCodes from "../api/useHSCodes";
import useHSCodesChapters from "../api/useHSCodesChapters";
import { useEditItemModal } from "../hooks/use-edit-item-modal";
import { useNewItemModal } from "../hooks/use-new-item-modal";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

type ItemFormProps = {
  item?: ItemValues;
};

export default function ItemForm({ item }: ItemFormProps) {
  const [itemType, setItemType] = useState<"items" | "documents">(
    item ? item?.itemType : "items"
  );
  const { onClose: newItemClose, parcel_id: addingParcelID } =
    useNewItemModal();
  const {
    onClose: editItemClose,
    parcel_id: editingParcelID,
    item_id,
  } = useEditItemModal();

  const { addItem, editItem } = useShipmentApplication();
  const { data: hsValues, isLoading: hsValuesLoading } = useHSCodesValues({
    hs_code: item?.itemType === "items" ? item.hsCode : undefined,
  });
  const { data: chapterCodes, isLoading: chapterLoading } =
    useHSCodesChapters();
  const [chapterId, setChapterId] = useState<string | undefined>(() => {
    if (item && item.itemType === "items") {
      return item.category;
    }
    return undefined;
  });
  const [categoryId, setCategoryId] = useState<string | undefined>(() => {
    if (item && item.itemType === "items") {
      return item.subCategory;
    }
    return undefined;
  });
  const { data: subCategories, isLoading: categoryLoading } =
    useHSCodeCategories({
      chapter_id: chapterId,
    });
  const { data: hs_codes, isLoading: codesLoading } = useHSCodes({
    category_id: categoryId,
  });
  const form = useForm<ItemValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemType: item ? item.itemType : "items",
      name: item?.name ?? "",
      description: item?.description ?? "",
      weight: item?.weight ?? 1,
      quantity: item?.quantity ?? 1,
      // Conditionally include fields based on itemType
      ...(item?.itemType === "items"
        ? {
            category: item.category ?? "",
            subCategory: item.subCategory ?? "",
            hsCode: item.hsCode ?? "",
            value: item.value ?? 0,
          }
        : {}),
    },
  });

  useEffect(() => {
    if (item && hsValues) {
      if (item.itemType === "items") {
        // Reset form for "items" type
        setChapterId(hsValues.chapter);
        setCategoryId(hsValues.hs_category_code);
        form.reset({
          itemType: "items",
          name: item.name,
          description: item.description,
          weight: item.weight,
          quantity: item.quantity,
          value: item.value, // Required for "items"
          category: hsValues.chapter, // Required for "items"
          subCategory: hsValues.sub_category, // Required for "items"
          hsCode: item.hsCode, // Required for "items"
        });
      } else if (item.itemType === "documents") {
        // Reset form for "documents" type
        form.reset({
          itemType: "documents",
          name: item.name,
          description: item.description,
          weight: item.weight,
          quantity: item.quantity,
        });
      }
      form.trigger();
    }
  }, [form, hsValues, item]);

  function reset() {
    form.reset({
      itemType: "items",
      value: 0,
      weight: 1,
      quantity: 1,
      description: "",
      name: "",
      category: "",
      hsCode: "",
      subCategory: "",
    });
    setChapterId(undefined);
    setCategoryId(undefined);
  }

  function onSubmit(values: ItemValues) {
    if (item) {
      if (editingParcelID !== undefined && item_id !== undefined) {
        console.log("");
        editItem(editingParcelID, item_id, values);
        reset();
        editItemClose();
      }
    } else {
      if (addingParcelID !== undefined) {
        addItem(addingParcelID, values);
        reset();
        newItemClose();
      }
    }
  }

  const chapterOptions = chapterCodes?.data.map((chapter) => ({
    label: chapter.name,
    value: chapter.id,
  }));

  const categoryOptions = subCategories?.data.map((category) => ({
    label: category.category,
    value: category.id,
  }));

  const hsCodeOptions = hs_codes?.data.hs_codes.map((code) => ({
    label: code.sub_category,
    value: code.hs_code,
  }));

  return (
    <Form {...form}>
      <form
        className="space-y-2 md:space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="itemType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setItemType(value as "items" | "documents");
                  }}
                  defaultValue={field.value}
                  className="flex items-center gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="items" />
                    </FormControl>
                    <FormLabel className="font-normal">Items</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="documents" />
                    </FormControl>
                    <FormLabel className="font-normal">Documents</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input
                  className="h-10"
                  placeholder="e.g Red Gucci Skirt"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Input className="h-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {itemType === "items" ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Category</FormLabel>

                    <FormControl>
                      <PSelect
                        value={field.value}
                        disabled={chapterLoading || hsValuesLoading}
                        isLoading={chapterLoading || hsValuesLoading}
                        options={chapterOptions}
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value);
                            setChapterId(value);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Sub-Category</FormLabel>

                    <FormControl>
                      <PSelect
                        value={field.value}
                        disabled={categoryLoading || hsValuesLoading}
                        isLoading={categoryLoading || hsValuesLoading}
                        options={categoryOptions}
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value);
                            setCategoryId(value);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid-cols-2 grid gap-4">
              <FormField
                control={form.control}
                name="hsCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select HS Code</FormLabel>

                    <FormControl>
                      <PSelect
                        value={field.value}
                        disabled={codesLoading || hsValuesLoading}
                        isLoading={codesLoading || hsValuesLoading}
                        options={hsCodeOptions}
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="weight"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Value</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className=" text-sm absolute left-3 top-1/2 -translate-y-1/2 transform">
                          NGN
                        </span>
                        <Input className="h-10 ps-12" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="weight"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <Button className="w-full" size="lg">
          Save Item
        </Button>
      </form>
    </Form>
  );
}
