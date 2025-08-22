import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Builder } from "./builder-schema";
import { output } from "./builder-template";

const queryKey = ["builder-factory"];

export const useBuilderQuery = (defaultValues: Builder) => {
  const query = useQuery({
    queryKey,
    queryFn: () => output(defaultValues),
  });

  return query;
};

export const useBuilderMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: output,
    onMutate: (data) => {
      return;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    mutate,
    isError,
  };
};
