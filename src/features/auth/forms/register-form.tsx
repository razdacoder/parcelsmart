import SubmitButton from "@/components/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { registerSchema, RegisterValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useRegister from "../api/useRegister";

type ApiErrorResponse = {
  message: string;
  errors: {
    [key in keyof RegisterValues]?: string[];
  };
};
export default function RegisterForm() {
  const { mutate, isPending } = useRegister();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
      username: "",
      acceptTerms: false,
    },
  });

  function onSumbit(values: RegisterValues) {
    if (!values.acceptTerms) {
      form.setError("acceptTerms", {
        message: "Please accept our terms and conditions to register!",
      });
      return;
    }
    const data: RegsiterUserData = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      password: values.password,
      confirm_password: values.confirm_password,
      account_type: "personal",
    };
    mutate(data, {
      onError: (error) => {
        // Use type casting to specify that `error.response.data` is of type `ApiErrorResponse`
        const apiErrors = (error.response?.data as ApiErrorResponse)?.errors;

        if (apiErrors) {
          Object.keys(apiErrors).forEach((field) => {
            if (form.getValues()[field as keyof RegisterValues] !== undefined) {
              form.setError(field as keyof RegisterValues, {
                type: "server",
                message:
                  apiErrors[field as keyof RegisterValues]?.[0] ||
                  "An error occurred",
              });
            }
          });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="first_name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                      disabled={isPending}
                      className="ps-10"
                      type="text"
                      placeholder="Enter First Name"
                      {...field}
                    />
                  </div>
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
                <FormControl>
                  <div className="relative">
                    <User className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                      disabled={isPending}
                      className="ps-10"
                      type="text"
                      placeholder="Enter Last Name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    disabled={isPending}
                    className="ps-10"
                    type="text"
                    placeholder="Enter Username"
                    {...field}
                  />
                </div>
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
              <FormControl>
                <PhoneInput
                  disabled={isPending}
                  defaultCountry="NG"
                  international
                  placeholder="Enter phone number"
                  className="flex h-11 w-full rounded-md border border-primary bg-transparent px-4 py-2 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    disabled={isPending}
                    className="ps-10"
                    type="email"
                    placeholder="Enter Email"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    disabled={isPending}
                    {...field}
                    placeholder="Enter Password"
                  />
                </FormControl>
                <FormDescription>
                  Your password must have at least 8 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirm_password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    disabled={isPending}
                    {...field}
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  disabled={isPending}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="size-5"
                />
              </FormControl>
              <div className="space-y-2 leading-none">
                <FormLabel className="text-sm font-light">
                  By creating an account means you agree to the
                  <Link to="#" className="font-medium">
                    Terms & Conditions
                  </Link>{" "}
                  and our{" "}
                  <Link to="#" className="font-medium">
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}>Create Account</SubmitButton>
      </form>
    </Form>
  );
}
