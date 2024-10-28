import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: { id: string; category: string; category_count: number }[];
};

export default function useHSCodeCategories({
  chapter_id,
}: {
  chapter_id?: string;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!chapter_id,
    queryKey: ["hs-codes-categories", chapter_id],
    queryFn: async () => {
      const response = await client.get("/hs-codes/categories", {
        params: { chapter: chapter_id },
      });
      return response.data;
    },
  });
}
