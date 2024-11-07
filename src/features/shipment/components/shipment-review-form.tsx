import StarRating from "@/components/star-rating";
import SubmitButton from "@/components/submit-button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema, ReviewValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ShipmentReviewForm() {
  const form = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      stars: 0,
      review: "",
    },
  });
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-center text-gray-500">
        Tap the stars to rate
      </p>
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            name="stars"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex justify-center">
                <FormControl>
                  <StarRating
                    totalStars={5}
                    onRate={(rating) => field.onChange(rating)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="review"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about our service!"
                    rows={4}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <SubmitButton disabled={false} isPending={false}>
            Submit
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}
