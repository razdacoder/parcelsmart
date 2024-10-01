import { Button } from "@/components/ui/button";
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

export default function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirm: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          name="current_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput {...field} placeholder="Current Password" />
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
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
