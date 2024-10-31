import { client } from "@/lib/client";
import { PackagingValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ResponseType = {
  status: boolean;
  message: string;
  data: {
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    size_unit: string;
    weight_unit: string;
    type: string;
    id: string;
    updated_at: Date;
    created_at: Date;
    platform_id: string;
  };
};

export default function useUpdatePackaging() {
  const queryClient = useQueryClient();
  return useMutation<
    ResponseType,
    AxiosError<ErrorResponseType>,
    { id: string; values: PackagingValues }
  >({
    mutationFn: async (data) => {
      const response = await client.put(`/packaging/${data.id}`, data.values);
      return response.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["packaging-list"] });
      queryClient.invalidateQueries({ queryKey: ["packaging", variables.id] });
      toast.success(data.message);
    },
  });
}
