import { useQueryClient, useMutation } from "@tanstack/react-query";

import { rpcs as formsResponsePublicRPCs } from "~/services/rpcs/forms-response-public";

export const useMutateData = () => {
  // const queryClient = useQueryClient();
  const mutateCreate = useMutation({
    mutationFn: formsResponsePublicRPCs.create,
    onSuccess: (data, variables) => {
      // console.log(data, " success");
    },
    onSettled: (response) => {
      // console.log("settled", response);
    },
  });

  return {
    mutateCreate,
  };
};
