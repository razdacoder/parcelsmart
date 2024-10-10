import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: VirtualAccount[];
};

export default function useVirtualAccount() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["virtual-accounts"],
    queryFn: async () => {
      const response = await client.get("/virtual-accounts");
      return response.data;
    },
  });
}
