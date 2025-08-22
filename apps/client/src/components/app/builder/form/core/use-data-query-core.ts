import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { processQuery, processMutation } from "./data-process-core";

const queryKey = ["core"];

export const useDataQuery = () => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: processQuery,
  });

  const fields = query.data?.fields || [];

  return { fields };
};

export const useDataMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation({
    mutationFn: processMutation,
    onMutate: (data) => {
      return;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    mutate,
    isError,
  };
};
