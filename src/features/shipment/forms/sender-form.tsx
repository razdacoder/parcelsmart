import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { addressSchema, AddressValues } from "@/lib/schemas";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { AddressBookSearch } from "@/components/address-book-search";
import { PSelect } from "@/components/select";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAddress from "@/features/address/api/useAddress";
import useCity from "@/features/address/api/useCity";
import useCountries from "@/features/address/api/useCountries";
import useCreateAddress from "@/features/address/api/useCreateAddress";
import useEditAddress from "@/features/address/api/useEditAddress";
import useStateList from "@/features/address/api/useState";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function SenderForm({ next }: StepsProps) {
  const navigate = useNavigate();
  const { setSenderValues, sender, clearSenderValues, clearAll } =
    useShipmentApplication();
  const { mutate: createAddress, isPending: creating } = useCreateAddress();
  const { mutate: updateAddress, isPending: editing } = useEditAddress({
    id: sender?.id,
  });
  const [addressId, setAddressId] = useState<string>();
  const [stateCode, setStateCode] = useState<string | null | undefined>();
  const [countryCode, setCountryCode] = useState<string | null | undefined>(
    () => {
      if (sender?.country) {
        return sender.country;
      }
      return null;
    }
  );

  const { data: countryList, isLoading: countryListPending } = useCountries();
  const { data: stateList, isLoading: stateListPending } = useStateList({
    country_code: countryCode,
  });
  const { data: cityList, isLoading: cityListPending } = useCity({
    country_code: countryCode,
    state_code: stateCode,
  });

  const { refetch, isLoading } = useAddress({ id: addressId });

  useEffect(() => {
    const fetchNewAddress = async () => {
      if (addressId) {
        console.log(addressId);
        const newQueryData = await refetch();
        const newAddressData = newQueryData.data?.data;

        if (newAddressData) {
          // Reset the form with the new address data
          form.reset(newAddressData);
          setSenderValues(newAddressData);
          // Update country and state codes
          setCountryCode(newAddressData.country);
          const state = stateList?.data.find(
            (state) => state.name === newAddressData.state
          );
          setStateCode(state?.state_code || null);
        }
      }
    };

    fetchNewAddress();
  }, [addressId, refetch]);

  const isPending = creating || editing || isLoading;

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      first_name: sender ? sender.first_name : "",
      last_name: sender ? sender.last_name : "",
      email: sender ? sender.email : "",
      phone_number: sender ? sender.phone_number : "",
      line_1: sender ? sender.line_1 : "",
      line_2: sender ? sender.line_2 : "",
      country: sender ? sender.country : "",
      state: sender ? sender.state : "",
      city: sender ? sender.city : "",
      zip_code: sender ? sender.zip_code : "",
    },
  });

  const countryOptions = countryList?.data.map((country) => ({
    label: country.name,
    value: country.country_code,
  }));

  const cityOptions = cityList?.data.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const stateOptions = stateList?.data.map((state) => ({
    label: state.name,
    value: `${state.name}-${state.state_code}`,
  }));

  function getStateValue(): string {
    const state = stateList?.data.find((state) => state.name === sender?.state);
    setStateCode(state?.state_code);
    return `${state?.name}-${state?.state_code}`;
  }

  function onSubmit(values: AddressValues) {
    sender
      ? updateAddress(values, {
          onSuccess: (data) => {
            setSenderValues(data.data);
            next();
          },
        })
      : createAddress(values, {
          onSuccess: (data) => {
            setSenderValues(data.data);
            next();
          },
        });
  }

  function clearValues() {
    clearSenderValues();
    form.reset({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      line_1: "",
      line_2: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
    });
    setCountryCode(null);
    setStateCode(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-text">Add Sender</h3>
          <p className="text-sm text-muted-foreground">
            Search from your saved addresses or create a new address.
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

      <AddressBookSearch
        onChange={(value) => {
          setAddressId(value);
        }}
      />
      <div className="space-y-1">
        <Label htmlFor="addresss">Address</Label>
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            id="address"
            className="ps-10 bg-[#F4FDF8] h-10"
            type="text"
            placeholder="Search your address on Google (optional)"
          />
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
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
          <div className="grid md:grid-cols-2 gap-4">
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
                      disabled={isPending}
                      defaultCountry="NG"
                      international
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
          <div className="grid md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <PSelect
                      placeholder="Select"
                      disabled={countryListPending}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        setCountryCode(value!);
                      }}
                      options={countryOptions}
                    />
                  </FormControl>

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
                  <FormControl>
                    <PSelect
                      placeholder="Select"
                      disabled={stateListPending}
                      value={sender ? getStateValue() : field.value}
                      onChange={(value) => {
                        field.onChange(value?.split("-")[0]);
                        setStateCode(value?.split("-")[1]);
                      }}
                      options={stateOptions}
                    />
                  </FormControl>

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
                  <FormControl>
                    <PSelect
                      placeholder="Select"
                      disabled={cityListPending}
                      value={field.value}
                      onChange={field.onChange}
                      options={cityOptions}
                    />
                  </FormControl>

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
          <div className="flex flex-col md:flex-row items-center gap-6 mt-12">
            <Button
              disabled={isPending}
              type="button"
              size="lg"
              variant="destructive"
              onClick={() => clearValues()}
              className="bg-[#E74C3C33] text-destructive w-full md:w-fit shadow-none hover:bg-[#E74C3C33] hover:text-destructive/80 px-8"
            >
              Clear All
            </Button>

            <SubmitButton
              className="w-fit px-12"
              isPending={creating || editing}
            >
              Continue
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
