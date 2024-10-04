import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
      otp: "",
    },
  });
  function onSubmit(values: NewPasswordValues) {
    mutate({ ...values, email });
  }
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>OTP</FormLabel> */}
              <FormControl>
                <InputOTP disabled={isPending} maxLength={4} {...field}>
                  <InputOTPGroup className="w-full grid grid-cols-4 text-lg gap-3 text-primary font-semibold">
                    <InputOTPSlot
                      className="w-full h-14 rounded-md border"
                      index={0}
                    />
                    <InputOTPSlot
                      className="w-full h-14 rounded-md border"
                      index={1}
                    />
                    <InputOTPSlot
                      className="w-full h-14 rounded-md border"
                      index={2}
                    />
                    <InputOTPSlot
                      className="w-full h-14 rounded-md border"
                      index={3}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
