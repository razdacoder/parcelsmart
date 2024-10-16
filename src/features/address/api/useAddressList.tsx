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
  search: string;
};

export default function useAddressList({ page, search }: UseAddressListProps) {
  return useQuery<Response, AxiosError>({
    queryKey: ["address-list", page, search],
    queryFn: async () => {
      const response = await client.get("/addresses", {
        params: { page, search: search === "" ? undefined : search },
      });
      return response.data;
    },
  });
}
