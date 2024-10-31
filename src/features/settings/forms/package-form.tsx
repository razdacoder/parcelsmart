import { PSelect } from "@/components/select";
import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { packagingSchema, PackagingValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useCreatePackaging from "../api/use-create-packaging";
import useUpdatePackaging from "../api/use-update-packaging";
import { useEditPackage } from "../hooks/use-edit-package";
import { useNewPackage } from "../hooks/use-new-package";

export default function PackageForm({ packaging }: { packaging?: Packaging }) {
  const { mutate: createPackaging, isPending: creatingPackaging } =
    useCreatePackaging();
  const { mutate: updatePackaging, isPending: updatingPackaging } =
    useUpdatePackaging();
  const { onClose: newPackageClose } = useNewPackage();
  const { onClose: editPackageClose } = useEditPackage();
  const form = useForm<PackagingValues>({
    resolver: zodResolver(packagingSchema),
    defaultValues: {
      name: packaging ? packaging.name : "",
      type: packaging ? packaging.type : "box",
      weight: packaging ? packaging.weight : 0,
      height: packaging ? packaging.height : 0,
      width: packaging ? packaging.width : 0,
      length: packaging ? packaging.height : 0,
      size_unit: packaging ? (packaging.size_unit.toLowerCase() as "cm") : "cm",
      weight_unit: packaging
        ? (packaging.weight_unit.toLowerCase() as "kg")
        : "kg",
    },
  });

  const isPending = creatingPackaging || updatingPackaging;

  const typeOptions = [
    {
      label: "Box",
      value: "box",
    },
    {
      label: "Envelope",
      value: "envelope",
    },
    {
      label: "Soft Packaging",
      value: "soft-packaging",
    },
  ];

  function onSubmit(values: PackagingValues) {
    if (packaging) {
      updatePackaging(
        { id: packaging.id, values },
        {
          onSuccess: () => {
            editPackageClose();
          },
        }
      );
    } else {
      createPackaging(values, {
        onSuccess: () => {
          newPackageClose();
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Type</FormLabel>
                <FormControl>
                  <PSelect
                    onChange={field.onChange}
                    value={field.value}
                    options={typeOptions}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Package Name"
                    className="h-10"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FormField
            name="length"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    disabled={isPending}
                    className="h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="width"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    disabled={isPending}
                    className="h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="height"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    disabled={isPending}
                    className="h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="size_unit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <PSelect
                    onChange={field.onChange}
                    value={field.value}
                    options={[{ label: "CM", value: "cm" }]}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="weight"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input className="h-10" {...field} disabled={isPending} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="weight_unit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight Unit</FormLabel>
                <FormControl>
                  <PSelect
                    onChange={field.onChange}
                    value={field.value}
                    options={[{ label: "KG", value: "kg" }]}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <SubmitButton isPending={isPending} disabled={isPending}>
          Save Packaging
        </SubmitButton>
      </form>
    </Form>
  );
}
