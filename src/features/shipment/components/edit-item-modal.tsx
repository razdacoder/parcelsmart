import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { itemSchema, ItemValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useHSCodeCategories from "../api/useHSCodeCategories";
import useHSCodes from "../api/useHSCodes";
import useHSCodesChapters from "../api/useHSCodesChapters";
import { useEditItemModal } from "../hooks/use-edit-item-modal";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function EditItemModal() {
  const { isOpen, onClose, parcel_id, item_id } = useEditItemModal();
  const { editItem, parcels } = useShipmentApplication();
  const item = parcels?.[parcel_id!]?.items?.[item_id!];
  const [itemType, setItemType] = useState<"items" | "documents">(
    item?.itemType || "items"
  );

  const { data: chapterCodes, isLoading: chapterLoading } =
    useHSCodesChapters();

  const [chapterId, setChapterId] = useState<string | undefined>(() => {
    if (item?.itemType === "items") {
      return item.category;
    }
    return undefined;
  });
  const [categoryId, setCategoryId] = useState<string | undefined>(() => {
    if (item?.itemType === "items") {
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
      itemType: item?.itemType,
      name: item?.itemType === "items" ? item?.name : undefined,
      value: item?.itemType === "items" ? item?.value : undefined,
      category: item?.itemType === "items" ? item?.category : undefined,
      subCategory: item?.itemType === "items" ? item?.subCategory : undefined,
      description: item?.itemType === "items" ? undefined : item?.description,
      weight: item?.weight,
      quantity: item?.quantity,
      hsCode: item?.itemType === "items" ? item?.hsCode : undefined,
    },
  });

  function onSubmit(values: ItemValues) {
    editItem(parcel_id!, item_id!, values);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-11/12 md:max-w-xl p-0">
        <DialogClose className="absolute -top-10 md:-top-12 z-50 right-0 size-8 md:size-10 rounded-full bg-white flex justify-center items-center">
          <X className="size-4 md:size-5 " />
        </DialogClose>
        <DialogHeader className="relative justify-center items-center bg-[#F4FDF8] py-4 md:py-8 gap-2 md:gap-4">
          <DialogTitle className="text-2xl md:text-3xl font-medium text-text">
            Edit Item
          </DialogTitle>
          <DialogDescription className="hidden md:flex flex-col md:flex-row items-center gap-2 bg-white p-2 text-xs rounded-md text-muted-foreground">
            <TriangleAlert className="fill-yellow-500 stroke-white" />
            Shipments containing undervalued and prohibited items will be
            canceled.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 md:p-8 space-y-4">
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
                          <FormLabel className="font-normal">
                            Documents
                          </FormLabel>
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
              {itemType === "items" ? (
                <>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setChapterId(value);
                          }}
                          defaultValue={field.value}
                          disabled={chapterLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Search" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {chapterCodes?.data.map((chapter) => (
                              <SelectItem value={chapter.id}>
                                {chapter.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

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
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setCategoryId(value);
                          }}
                          defaultValue={field.value}
                          disabled={categoryLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Search" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories?.data.map((sub) => (
                              <SelectItem value={sub.id}>
                                {sub.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hsCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select HS Code</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={codesLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Search" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hs_codes?.data.hs_codes.map((code) => (
                              <SelectItem value={code.hs_code}>
                                {code.sub_category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
