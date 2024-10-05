import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addressSchema, AddressValues } from "@/lib/schemas";
import { Search } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, State } from "country-state-city";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useCreateAddress from "../api/useCreateAddress";
import useEditAddress from "../api/useEditAddress";
import { useNewAddress } from "../hooks/use-new-address";

type AddressFormProps = {
  address?: AddressBook;
};

export default function AddressForm({ address }: AddressFormProps) {
  const { onClose } = useNewAddress();
  const isEditMode = Boolean(address);
  const [stateCode, setStateCode] = useState<string>();
  const { mutate: createAddress, isPending: createPending } =
    useCreateAddress();
  const { mutate: editAddress, isPending: editPending } = useEditAddress({
    id: address?.id,
  });

  function getStateValue(): string {
    const state = State.getStatesOfCountry(address?.country).find(
      (state) => state.name === address?.state
    );
    setStateCode(state?.isoCode);
    return `${state?.name}-${state?.isoCode}`;
  }

  const isPending = createPending || editPending;

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      first_name: isEditMode ? address?.first_name : "",
      last_name: isEditMode ? address?.last_name : "",
      email: isEditMode ? address?.email : "",
      phone_number: isEditMode ? address?.phone_number : "",
      line_1: isEditMode ? address?.line_1 : "",
      line_2: isEditMode ? address?.line_2 : "",
      country: isEditMode ? address?.country : "",
      state: isEditMode ? address?.state : "",
      city: isEditMode ? address?.city : "",
      zip_code: isEditMode ? address?.zip_code : "",
    },
  });

  function onSubmit(values: AddressValues) {
    isEditMode
      ? editAddress(values)
      : createAddress(values, {
          onSuccess: () => {
            onClose();
          },
        });
  }
  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-1">
        <Label htmlFor="addresss">Address</Label>
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            id="address"
            disabled={isPending}
            className="ps-10 bg-[#F4FDF8] h-10"
            type="text"
            placeholder="Search your address on Google (optional)"
          />
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="NG"
                      international
                      disabled={isPending}
                      className="flex h-10 w-full rounded-md border border-primary bg-transparent px-4 py-2 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="line_1"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 1</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="line_2"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address line 2 (add a landmark) - optional
                </FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Country.getAllCountries().map((country) => (
                        <SelectItem value={country.isoCode}>
                          {country.flag} {country.name}
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={(value) => {
                      field.onChange(value.split("-")[0]);
                      setStateCode(value.split("-")[1]);
                    }}
                    defaultValue={isEditMode ? getStateValue() : field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {State.getStatesOfCountry(form.getValues("country")).map(
                        (state) => (
                          <SelectItem value={`${state.name}-${state.isoCode}`}>
                            {state.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {City.getCitiesOfState(
                        form.getValues("country"),
                        stateCode!
                      ).map((country) => (
                        <SelectItem value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="zip_code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-6 mt-8">
            <Button
              type="button"
              size="lg"
              disabled={isPending}
              onClick={onClose}
              className="bg-[#E2FAEC] text-primary shadow-none hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
            >
              Go Back
            </Button>

            <Button
              size="lg"
              disabled={isPending}
              type="button"
              onClick={() => form.reset()}
              variant="destructive"
              className="bg-[#E74C3C33] text-destructive shadow-none hover:bg-[#E74C3C33] hover:text-destructive/80 px-8"
            >
              Clear All
            </Button>

            <SubmitButton isPending={isPending}>Save Address</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
