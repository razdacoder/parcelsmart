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

export default function PackageForm({ packaging }: { packaging?: Packaging }) {
  const form = useForm<PackagingValues>({
    resolver: zodResolver(packagingSchema),
    defaultValues: {
      name: packaging ? packaging.name : "",
      type: packaging ? packaging.type : "",
      weight: packaging ? packaging.weight : 0,
      height: packaging ? packaging.height : 0,
      length: packaging ? packaging.height : 0,
      size_unit: packaging ? packaging.size_unit : "",
      weight_unit: packaging ? packaging.weight_unit : "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
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
                    options={[]}
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
                  <Input placeholder="0" className="h-10" {...field} />
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
                  <Input placeholder="0" className="h-10" {...field} />
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
                  <Input placeholder="0" className="h-10" {...field} />
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
                    options={[]}
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
                  <Input className="h-10" {...field} />
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
                    options={[]}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <SubmitButton isPending={false} disabled={false}>
          Save Packaging
        </SubmitButton>
      </form>
    </Form>
  );
}
