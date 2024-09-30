import { Button } from "@/components/ui/button";
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

export default function NewPasswordForm() {
  const form = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      password_confirm: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput {...field} placeholder="New Password" />
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
                <PasswordInput {...field} placeholder="Confirm New Password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="lg" className="w-full">
          Set New Password
        </Button>
      </form>
    </Form>
  );
}
