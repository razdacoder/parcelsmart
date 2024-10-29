import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    address: string;
    carrier: string;
    city: string;
    country: string;
    state: string;
    email: string;
    phone: string;
    id: string;
  }[];
};

export default function useDropLocations({
  load,
  country_code,
  carrier,
  state_name,
  address_id
}: {
  load: boolean;
  country_code?: string;
  carrier?: string;
  state_name?: string;
  address_id?: string
}) {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    enabled: load,
    queryKey: [
      "drop-off-locations",
      country_code,
      carrier,
      state_name,
      address_id
    ],
    queryFn: async () => {
      const response = await client.get("/dropoff-locations", {
        params: {
          country_code,
          carrier,
          state: state_name,
          address_id
        },
      });
      return response.data;
    },
  });
}
