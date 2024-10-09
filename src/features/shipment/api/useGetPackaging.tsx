import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    packaging: Packaging[];
    pagination: Pagination;
  };
};

export default function useGetPackaging() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["packagings"],
    queryFn: async () => {
      const response = await client.get("/packaging");
      return response.data;
    },
  });
}
