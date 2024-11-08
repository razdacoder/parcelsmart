import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    hs_codes: HSCode[];
    pagination: Pagination;
  };
};

type HSCode = {
  chapter: string;
  chapter_name: string;
  hchapter_code: string;
  hs_chapter_name: string;
  category: string;
  hs_category_code: string;
  sub_category: string;
  hs_code: string;
};

export default function useHSCodesValues({ hs_code }: { hs_code?: string }) {
  return useQuery<HSCode, AxiosError<ErrorResponseType>>({
    enabled: !!hs_code,
    queryKey: ["hs-code-search", hs_code],
    queryFn: async () => {
      const response = await client.get("/hs-codes/search", {
        params: { page: 1, query_string: hs_code },
      });
      const data = response.data as ResponseType;
      return data.data.hs_codes[0];
    },
  });
}
