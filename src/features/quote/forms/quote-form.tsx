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
import { Label } from "@/components/ui/label";
import useCity from "@/features/address/api/useCity";
import useCountries from "@/features/address/api/useCountries";
import useStateList from "@/features/address/api/useState";
import { quoteSchema, QuoteValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useGetQuotes from "../api/use-get-qoutes";

type QuoteFormProps = {
  setQoutes: React.Dispatch<React.SetStateAction<Quote[] | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QuoteForm({ setQoutes, setIsLoading }: QuoteFormProps) {
  const form = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      from_country: "",
      from_city: "",
      from_state: "",
      to_country: "",
      to_city: "",
      to_state: "",
      estimated_weight: 0,
    },
  });

  // State for "from" fields
  const [fromStateCode, setFromStateCode] = useState<
    string | null | undefined
  >();
  const [fromCountryCode, setFromCountryCode] = useState<
    string | null | undefined
  >();

  // State for "to" fields
  const [toStateCode, setToStateCode] = useState<string | null | undefined>();
  const [toCountryCode, setToCountryCode] = useState<
    string | null | undefined
  >();

  // Fetch data for "from" location
  const { data: countryList, isLoading: countryListPending } = useCountries();
  const { data: fromStateList, isLoading: fromStateListPending } = useStateList(
    {
      country_code: fromCountryCode,
    }
  );
  const { data: fromCityList, isLoading: fromCityListPending } = useCity({
    country_code: fromCountryCode,
    state_code: fromStateCode,
  });

  // Fetch data for "to" location
  const { data: toStateList, isLoading: toStateListPending } = useStateList({
    country_code: toCountryCode,
  });
  const { data: toCityList, isLoading: toCityListPending } = useCity({
    country_code: toCountryCode,
    state_code: toStateCode,
  });

  const countryOptions = countryList?.data.map((country) => ({
    label: country.name,
    value: country.country_code,
  }));

  const fromCityOptions = fromCityList?.data.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const fromStateOptions = fromStateList?.data.map((state) => ({
    label: state.name,
    value: `${state.name}-${state.state_code}`,
  }));

  const toCityOptions = toCityList?.data.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const toStateOptions = toStateList?.data.map((state) => ({
    label: state.name,
    value: `${state.name}-${state.state_code}`,
  }));

  const { mutate, isPending } = useGetQuotes();

  function onSubmit(values: QuoteValues) {
    setIsLoading(true);
    mutate(values, {
      onSuccess: (data) => {
        setQoutes(data.data);
        setIsLoading(isPending);
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
        setIsLoading(isPending);
      },
      onSettled: () => {
        setIsLoading(isPending);
      },
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <Label className="font-bold">Shipping From?</Label>
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="from_country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PSelect
                      placeholder="Country"
                      value={field.value}
                      onChange={(value) => {
                        if (value) {
                          field.onChange(value);
                          setFromCountryCode(value);
                        }
                      }}
                      options={countryOptions}
                      isLoading={countryListPending}
                      disabled={countryListPending || isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from_state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PSelect
                      placeholder="State"
                      isLoading={fromStateListPending}
                      disabled={fromStateListPending || isPending}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value?.split("-")[0]);
                        setFromStateCode(value?.split("-")[1]);
                      }}
                      options={fromStateOptions}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from_city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PSelect
                      isLoading={fromCityListPending}
                      placeholder="City"
                      disabled={fromCityListPending || isPending}
                      value={field.value}
                      onChange={field.onChange}
                      options={fromCityOptions}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label className="font-bold">Shipping To?</Label>
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="to_country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PSelect
                      placeholder="Country"
                      value={field.value}
                      onChange={(value) => {
                        if (value) {
                          field.onChange(value);
                          setToCountryCode(value);
                        }
                      }}
                      options={countryOptions}
                      isLoading={countryListPending}
                      disabled={countryListPending || isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to_state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PSelect
                      placeholder="State"
                      isLoading={toStateListPending}
                      disabled={toStateListPending || isPending}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value?.split("-")[0]);
                        setToStateCode(value?.split("-")[1]);
                      }}
                      options={toStateOptions}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to_city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PSelect
                      isLoading={toCityListPending}
                      placeholder="City"
                      disabled={toCityListPending || isPending}
                      value={field.value}
                      onChange={field.onChange}
                      options={toCityOptions}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          name="estimated_weight"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Weight (kg)</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} className="h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button disabled={isPending} size="lg">
            {isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              "Get Quote"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
