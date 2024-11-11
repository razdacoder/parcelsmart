import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type RequestType = {
  id: string;
  star_rating: number;
  review: string;
};

type ResponseType = {
  status: boolean;
  message: string;
  data: Review[];
};

export default function useCreateReview() {
  return useMutation<ResponseType, AxiosError<ErrorResponseType>, RequestType>({
    mutationFn: async ({ id, star_rating, review }) => {
      const response = await client.post(`/shipments/${id}/review`, {
        star_rating,
        review,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data.message);
    },
  });
}
