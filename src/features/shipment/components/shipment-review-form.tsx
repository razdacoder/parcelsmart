import StarRating from "@/components/star-rating";
import SubmitButton from "@/components/submit-button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema, ReviewValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useCreateReview from "../api/use-create-review";
import { useNewReview } from "../hooks/use-review";
import { useShipmentDetailModal } from "../hooks/use-shipment-detail-modal";

export default function ShipmentReviewForm() {
  const { shipment_id, onClose } = useNewReview();
  const { mutate, isPending } = useCreateReview();
  const { onOpen } = useShipmentDetailModal();
  const form = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      stars: 0,
      review: "",
    },
  });

  function onSubmit(values: ReviewValues) {
    if (shipment_id) {
      mutate(
        { id: shipment_id, star_rating: values.stars, review: values.review },
        {
          onSuccess: () => {
            onClose();
            onOpen(shipment_id);
          },
        }
      );
    }
  }
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-center text-gray-500">
        Tap the stars to rate
      </p>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <SubmitButton disabled={isPending} isPending={isPending}>
            Submit
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}
