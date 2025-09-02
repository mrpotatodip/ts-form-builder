import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { processQuery, processMutation } from "./data-process-core";

const queryKey = ["core"];
const queryFn = processQuery;

export const useDataQuery = () => {
  const { data } = useQuery({
    queryKey,
    queryFn,
    staleTime: 0,
  });

  const fields = data ? data.fields : [];

  return { fields };
};

export const useDataMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    mutate,
    isError,
    isPending,
  };
};
