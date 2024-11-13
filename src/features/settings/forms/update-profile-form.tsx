import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMe from "@/features/auth/api/useMe";
import { updateProfileSchema, UpdateProfileValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useUpdateProfile from "../api/use-update-profile";
import { useUpdateProfileModal } from "../hooks/use-update-profile-modal";

export default function UpdateProfileForm() {
  const { data } = useMe();
  const { mutate, isPending } = useUpdateProfile();
  const { onClose } = useUpdateProfileModal();
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: data ? data.data.first_name : undefined,
      last_name: data ? data.data.last_name : undefined,
      phone_number: data ? data.data.phone_number : undefined,
      email: data ? data.data.email : undefined,
    },
  });

  function onSubmit(values: UpdateProfileValues) {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="first_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    className="ps-10"
                    type="text"
                    placeholder="Enter First Name"
                    {...field}
                    disabled={isPending}
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
                    className="ps-10"
                    type="text"
                    placeholder="Enter Last Name"
                    {...field}
                    disabled={isPending}
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
                  defaultCountry="NG"
                  international
                  placeholder="Enter phone number"
                  className="flex h-11 w-full rounded-md border border-primary bg-transparent px-4 py-2 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 outline-none"
                  {...field}
                  disabled={isPending}
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
                    className="ps-10"
                    type="email"
                    placeholder="Enter Email"
                    {...field}
                    disabled
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending} disabled={isPending}>
          Update Profile
        </SubmitButton>
      </form>
    </Form>
  );
}
