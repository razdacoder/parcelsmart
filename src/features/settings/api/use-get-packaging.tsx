import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: Packaging;
};

export default function useGetPackaging({ id }: { id?: string }) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!id,
    queryKey: ["packaging", id],
    queryFn: async () => {
      const response = await client.get(`/packaging/${id}`);
      return response.data;
    },
  });
}
