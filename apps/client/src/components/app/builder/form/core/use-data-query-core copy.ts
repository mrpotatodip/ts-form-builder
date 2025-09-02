import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { processQuery, processMutation } from "./data-process-core";
import { Builder } from "./schema-core";

const queryKey = ["core"];

export const useDataQuery = (subKey: string = "") => {
  const { data } = useQuery({
    queryKey: [...queryKey, { subKey }],
    queryFn: processQuery,
  });

  const fields = data ? data.fields : [];

  return { fields };
};

export const useDataMutation = (subKey: string = "") => {
  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation({
    mutationFn: processMutation,
    onMutate: (data) => {
      return;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([...queryKey, { subKey }], data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKey, { subKey }] });
    },
  });

  return {
    mutate,
    isError,
  };
};
