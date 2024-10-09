import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: { id: string; name: string }[];
};

export default function useHSCodesChapters() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["hs-codes-chapters"],
    queryFn: async () => {
      const response = await client.get("/hs-codes/chapters");
      return response.data;
    },
  });
}
