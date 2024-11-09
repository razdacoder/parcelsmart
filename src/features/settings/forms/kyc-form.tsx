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
import { kycSchema, KYCValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, File, Trash2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function KYCForm() {
  const form = useForm<KYCValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      document_type: "drivers_license",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          name="document_type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <FormControl>
                <PSelect
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  options={[
                    {
                      label: "Driver's License",
                      value: "drivers_license",
                    },
                    {
                      label: "National Identity Card",
                      value: "id_card",
                    },
                    {
                      label: "International Passport",
                      value: "passport",
                    },
                  ]}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="id_number"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your Identification Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="eg. 164529652"
                  className="h-10"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <div className="py-4 px-6 rounded-t-xl bg-[#5F9EA0] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg ">
                <Upload className="size-6 md:size-8 text-primary " />
              </div>
              <h3 className="text-sm md:text-base text-white font-semibold">
                Click to upload Proof of Identification
              </h3>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <File className="text-blue-500" />
              <div className="flex flex-col text-xs ">
                <h6 className="font-semibold text-text">
                  Proof of Identification
                </h6>
                <p className="text-muted-foreground">50kb</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="3">
                <Eye className="size-4 text-primary" />
              </Link>
              <button>
                <Trash2 className="size-4 text-destructive" />
              </button>
            </div>
          </div>
        </div>

        <SubmitButton className="h-11" isPending={false} disabled={false}>
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
}
