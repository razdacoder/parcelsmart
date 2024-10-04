import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { newPasswordSchema, NewPasswordValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useResetPassword from "../api/useResetPassword";

export default function NewPasswordForm({ email }: { email: string }) {
  const { mutate, isPending } = useResetPassword();
  const form = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  function onSubmit(values: NewPasswordValues) {
    mutate({ ...values, email, otp: "" });
  }
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  disabled={isPending}
                  {...field}
                  placeholder="New Password"
                />
              </FormControl>

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
                  placeholder="Confirm New Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isPending={isPending}>Set New Password</SubmitButton>
      </form>
    </Form>
  );
}
