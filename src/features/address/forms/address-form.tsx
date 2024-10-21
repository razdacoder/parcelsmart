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
import { addressSchema, AddressValues } from "@/lib/schemas";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { PSelect } from "@/components/select";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import useCity from "../api/useCity";
import useCountries from "../api/useCountries";
import useCreateAddress from "../api/useCreateAddress";
import useEditAddress from "../api/useEditAddress";
import useStateList from "../api/useState";
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
    const state = stateList?.data.find(
      (state) => state.name === address?.state
    );
    setStateCode(state?.state_code);
    return `${state?.name}-${state?.state_code}`;
  }

  const [countryCode, setCountryCode] = useState<string>();

  const { data: countryList, isLoading: countryListPending } = useCountries();
  const { data: stateList, isLoading: stateListPending } = useStateList({
    country_code: countryCode,
  });
  const { data: cityList, isLoading: cityListPending } = useCity({
    country_code: countryCode,
    state_code: stateCode,
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

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    const addressComponents = place.address_components;

    if (addressComponents) {
      const getComponent = (
        components: google.maps.GeocoderAddressComponent[],
        type: string
      ): google.maps.GeocoderAddressComponent | undefined => {
        return components.find((comp) => comp.types.includes(type));
      };

      form.reset({
        line_1: place.formatted_address,
        city: getComponent(addressComponents, "locality")?.long_name,
        state: getComponent(addressComponents, "administrative_area_level_1")
          ?.long_name,
        country: getComponent(addressComponents, "country")?.short_name,
        zip_code: getComponent(addressComponents, "postal_code")?.long_name,
      });
      setCountryCode(getComponent(addressComponents, "country")?.short_name);
      setStateCode(
        getComponent(addressComponents, "administrative_area_level_1")
          ?.short_name
      );
    }
  };

  function onSubmit(values: AddressValues) {
    if (isEditMode) {
      editAddress(values);
    } else {
      createAddress(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }
  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-1">
        <Label htmlFor="addresss">Address</Label>
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground z-10" />

          <Autocomplete
            className="flex h-10 ps-10 bg-[#F4FDF8] w-full rounded-md border border-input px-4 py-2 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            onPlaceSelected={(place) => handlePlaceSelected(place)}
            placeholder="Search your address on Google (optional)"
            options={{
              types: ["address"],
            }}
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

                  <FormControl>
                    <PSelect
                      placeholder="Select"
                      value={field.value}
                      disabled={countryListPending}
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
                      value={isEditMode ? getStateValue() : field.value}
                      disabled={stateListPending || !stateList}
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
                      value={field.value}
                      disabled={cityListPending || !cityList}
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
