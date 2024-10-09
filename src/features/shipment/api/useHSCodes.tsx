import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    hs_codes: {
      chapter: string;
      chapter_name: string;
      hchapter_code: string;
      hs_chapter_name: string;
      category: string;
      hs_category_code: string;
      sub_category: string;
      hs_code: string;
    }[];
    pagination: Pagination;
  };
};

export default function useHSCodes({ category_id }: { category_id?: string }) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!category_id,
    queryKey: ["hs-code", category_id],
    queryFn: async () => {
      const response = await client.get("/hs-codes/search", {
        params: { category_code: category_id },
      });
      return response.data;
    },
  });
}
