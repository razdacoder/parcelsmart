import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    name: string;
    state_code: string;
    country_code: string;
    latitude: string;
    longitude: string;
  }[];
};

export default function useCity({
  country_code,
  state_code,
}: {
  country_code?: string | null;
  state_code?: string | null;
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: !!country_code && !!state_code,
    queryKey: ["city", country_code, state_code],
    queryFn: async () => {
      const response = await client.get("/cities", {
        params: { country_code, state_code },
      });
      return response.data;
    },
  });
}
