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
import { otpSchema, OTPValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useVerifyEmail from "../api/useVerifyEmail";

export default function OTPVerificationForm({ email }: { email: string }) {
  const { mutate, isPending } = useVerifyEmail();
  const form = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(values: OTPValues) {
    mutate({ email: email, otp: values.pin });
  }
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP disabled={isPending} maxLength={6} {...field}>
                  <InputOTPGroup className="w-full grid grid-cols-4 text-lg gap-3 text-primary font-semibold">
                    <InputOTPSlot
                      className="w-full h-16 rounded-md border"
                      index={0}
                    />
                    <InputOTPSlot
                      className="w-full h-16 rounded-md border"
                      index={1}
                    />
                    <InputOTPSlot
                      className="w-full h-16 rounded-md border"
                      index={2}
                    />
                    <InputOTPSlot
                      className="w-full h-16 rounded-md border"
                      index={3}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}>Verify</SubmitButton>
      </form>
    </Form>
  );
}
