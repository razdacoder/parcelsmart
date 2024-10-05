import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: AddressBook;
};
export default function useAddress({ id }: { id?: string }) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!id,
    queryKey: ["address", id],
    queryFn: async () => {
      const response = await client.get(`/addresses/${id}`);
      return response.data;
    },
  });
}
