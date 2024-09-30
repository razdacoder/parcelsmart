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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { qouteSchema, QouteValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCountryDataList } from "countries-list";
import { useForm } from "react-hook-form";

export default function QouteForm() {
  const form = useForm<QouteValues>({
    resolver: zodResolver(qouteSchema),
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
  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="space-y-3">
          <Label className="font-bold">Shipping From?</Label>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="from_country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Country" />
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
              name="from_state"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="State" />
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
              name="from_city"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="City" />
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
          </div>
        </div>
        <div className="space-y-3">
          <Label className="font-bold">Shipping To?</Label>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="to_country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Country" />
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
              name="to_state"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="State" />
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
              name="to_city"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="City" />
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
          </div>
        </div>
        <FormField
          name="estimated_weight"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Weight (kg)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button size="lg">Get Quote</Button>
        </div>
      </form>
    </Form>
  );
}
