import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    name: string;
    country_code: string;
    currency: string;
    phonecode: string;
  }[];
};

export default function useCountries() {
  return useQuery<ResponseType, AxiosError<ErrorResponseType>>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await client.get("/countries");
      return response.data;
    },
  });
}
