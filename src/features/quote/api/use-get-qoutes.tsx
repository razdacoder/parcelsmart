import { client } from "@/lib/client.ts";
import { QuoteValues } from "@/lib/schemas.ts";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseType = {
  status: boolean;
  message: string;
  data: Quote[];
};

const useGetQuotes = () => {
  return useMutation<ResponseType, AxiosError<ErrorResponseType>, QuoteValues>({
    mutationFn: async (data) => {
      const reqBody = {
        origin_address: {
          country: data.from_country,
          state: data.from_state,
          city: data.from_city,
        },
        destination_address: {
          country: data.to_country,
          state: data.to_state,
          city: data.to_city,
        },
        item_weight: 1,
      };
      const response = await client.post("/rates/quote", reqBody);
      return response.data;
    },
  });
};

export default useGetQuotes;
