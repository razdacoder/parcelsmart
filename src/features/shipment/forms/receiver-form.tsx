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
import { recieverSchema, RecieverValues } from "@/lib/schemas";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCountryDataList } from "countries-list";
import { Search, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ReceiverForm() {
  const navigate = useNavigate();
  const form = useForm<RecieverValues>({
    resolver: zodResolver(recieverSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address1: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
  });
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
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              name="firstName"
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
              name="lastName"
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
              name="phoneNumber"
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
            name="address1"
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
            name="address2"
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getCountryDataList().map((country) => (
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
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getCountryDataList().map((country) => (
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
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getCountryDataList().map((country) => (
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
              name="zipCode"
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
        </form>
      </Form>
    </div>
  );
}
