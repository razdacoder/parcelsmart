import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { updatePasswordSchema, UpdatePasswordValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import useChangePassword from "../api/use-change-password";
import { useUpdatePasswordModal } from "../hooks/use-update-password-modal";

export default function UpdatePasswordForm() {
  const { mutate, isPending } = useChangePassword();
  const { onClose } = useUpdatePasswordModal();
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      password_confirm: "",
    },
  });

  function onSubmit(values: UpdatePasswordValues) {
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
          name="current_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Current Password"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="new_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="New Password"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password_confirm"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Confirm New Password"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton disabled={isPending} isPending={isPending}>
          Update Password
        </SubmitButton>
      </form>
    </Form>
  );
}
