import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addressSchema, AddressValues } from "@/lib/schemas";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, State } from "country-state-city";
import { Search, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

export default function RecieverForm({ next, prev }: StepsProps) {
  const navigate = useNavigate();
  const { setReceiverValues, receiver, clearReceiverValues } =
    useShipmentApplication();
  const [stateCode, setStateCode] = useState<string>();
  const [countryCode, setCountryCode] = useState<string | null>(() => {
    if (receiver?.country) {
      return receiver.country;
    }
    return null;
  });

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

  function getStateValue(): string {
    const state = State.getStatesOfCountry(receiver?.country).find(
      (state) => state.name === receiver?.state
    );
    setStateCode(state?.isoCode);
    return `${state?.name}-${state?.isoCode}`;
  }

  function onSubmit(values: AddressValues) {
    setReceiverValues(values);
    next();
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
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-text">Add Receiver</h3>
          <p className="text-sm text-muted-foreground">
            Search from your saved addresses or create a new address.
          </p>
        </div>
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <XCircle className="size-6" />
        </button>
      </div>

      <div className="relative">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          className="ps-10 bg-[#F4FDF8] h-10"
          type="text"
          placeholder="Search from address book"
        />
      </div>
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
                  <Select
                    // disabled={isPending}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCountryCode(value);
                    }}
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
                    // disabled={isPending}
                    onValueChange={(value) => {
                      field.onChange(value.split("-")[0]);
                      setStateCode(value.split("-")[1]);
                    }}
                    defaultValue={receiver ? getStateValue() : field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {State.getStatesOfCountry(countryCode!).map((state) => (
                        <SelectItem value={`${state.name}-${state.isoCode}`}>
                          {state.name}
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    // disabled={isPending}
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
                      ).map((city) => (
                        <SelectItem value={city.name}>{city.name}</SelectItem>
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
                    <Input {...field} className="h-10" />
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
              size="lg"
              className="bg-[#E2FAEC] text-primary shadow-none w-full md:w-fit hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
            >
              Previous
            </Button>

            <Button
              type="button"
              size="lg"
              onClick={clearValues}
              variant="destructive"
              className="bg-[#E74C3C33] text-destructive w-full md:w-fit shadow-none hover:bg-[#E74C3C33] hover:text-destructive/80 px-8"
            >
              Clear All
            </Button>

            <Button size="lg" className="px-12 w-full md:w-fit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
