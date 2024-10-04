import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type Response = {
  status: boolean;
  message: string;
  data: {
    addresses: AddressBook[];
    pagination: Pagination;
  };
};

type UseAddressListProps = {
  page: number;
};

export default function useAddressList({ page }: UseAddressListProps) {
  return useQuery<Response, AxiosError>({
    queryKey: ["address-list", page],
    queryFn: async () => {
      const response = await client.get("/addresses", { params: { page } });
      return response.data;
    },
  });
}
