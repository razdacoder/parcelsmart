import { Button } from "@/components/ui/button";
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

export default function OTPVerificationForm() {
  const form = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
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

        <Button size="lg" className="w-full">
          Verify
        </Button>
      </form>
    </Form>
  );
}
