import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, ResetPasswordValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import useForgotPassword from "../api/useForgotPassword";

export default function ResetPasswordForm() {
  const { mutate, isPending } = useForgotPassword();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ResetPasswordValues) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
        <SubmitButton isPending={isPending}>Send me an OTP</SubmitButton>
      </form>
    </Form>
  );
}
