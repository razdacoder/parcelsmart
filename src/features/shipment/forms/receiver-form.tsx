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
import Autocomplete from "react-google-autocomplete";

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

export default function RecieverForm({
  next,
  prev,
  data,
  prevLoading,
}: StepsProps & { data?: AddressBook; prevLoading: boolean }) {
  const navigate = useNavigate();
  const { setReceiverValues, receiver, clearReceiverValues, clearAll } =
    useShipmentApplication();
  const { mutate: createAddress, isPending: creating } = useCreateAddress();
  const { mutate: updateAddress, isPending: editing } = useEditAddress({
    id: receiver?.id,
  });
  const [addressId, setAddressId] = useState<string>();
  const [stateCode, setStateCode] = useState<string | null | undefined>();
  const [countryCode, setCountryCode] = useState<string | null | undefined>(
    () => {
      if (receiver?.country) {
        return receiver.country;
      }
      return null;
    }
  );

  const { refetch, isLoading } = useAddress({ id: addressId });

  const { data: countryList, isLoading: countryListPending } = useCountries();
  const { data: stateList, isLoading: stateListPending } = useStateList({
    country_code: countryCode,
  });
  const { data: cityList, isLoading: cityListPending } = useCity({
    country_code: countryCode,
    state_code: stateCode,
  });
  const isPending = creating || editing || isLoading || prevLoading;
  const addressPending =
    countryListPending || stateListPending || cityListPending;

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      first_name: receiver ? receiver.first_name : "",
      last_name: receiver ? receiver.last_name : "",
      email: receiver ? receiver.email : "",
      phone_number: receiver ? receiver.phone_number : "",
      line_1: receiver ? receiver.line_1 : "",
      line_2: receiver ? receiver.line_2 : "",
      country: receiver ? receiver.country : "",
      state: receiver ? receiver.state : "",
      city: receiver ? receiver.city : "",
      zip_code: receiver ? receiver.zip_code : "",
    },
  });

  useEffect(() => {
    const fetchNewAddress = async () => {
      if (addressId) {
        const newQueryData = await refetch();
        const newAddressData = newQueryData.data?.data;

        if (newAddressData) {
          // Reset the form with the new address data
          form.reset(newAddressData);
          setReceiverValues(newAddressData);
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
  }, [addressId, form, refetch, setReceiverValues, stateList?.data]);

  useEffect(() => {
    if (data) {
      setReceiverValues(data);
      form.reset(data);
      setCountryCode(data.country);
      const state = stateList?.data.find((state) => state.name === data.state);
      setStateCode(state?.state_code || null);
    }
  }, [data, form, setReceiverValues, stateList?.data]);

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
    const state = stateList?.data.find(
      (state) => state.name === receiver?.state
    );
    setStateCode(state?.state_code);
    return `${state?.name}-${state?.state_code}`;
  }

  function onSubmit(values: AddressValues) {
    if (receiver) {
      updateAddress(values, {
        onSuccess: (data) => {
          setReceiverValues(data.data);
          next?.();
        },
      });
    } else {
      createAddress(values, {
        onSuccess: (data) => {
          setReceiverValues(data.data);
          next?.();
        },
      });
    }
  }

  function clearValues() {
    clearReceiverValues();
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

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-text">Add Receiver</h3>
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
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-10" />
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
                    <Input {...field} className="h-10" />
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
                    <Input type="email" {...field} className="h-10" />
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
                  <Input {...field} className="h-10" />
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
                  <Input {...field} className="h-10" />
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
                      disabled={countryListPending}
                      isLoading={countryListPending}
                      placeholder="Select"
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
                      disabled={stateListPending}
                      isLoading={stateListPending}
                      placeholder="Select"
                      value={receiver ? getStateValue() : field.value}
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
                      disabled={cityListPending}
                      isLoading={cityListPending}
                      placeholder="Select"
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
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <Button
              type="button"
              onClick={() => prev?.()}
              disabled={isPending}
              size="lg"
              className="bg-[#E2FAEC] text-primary shadow-none w-full md:w-fit hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
            >
              Previous
            </Button>

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
              className="w-full md:w-fit px-12"
              disabled={isPending || !form.formState.isValid || addressPending}
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
