import { useParams } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  useQueryClient,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";

import type { FormResponseListParam, FormResponseDetailParam } from "shared";
import { queryOptionFactory as formsResponseQOF } from "~/services/query-options/forms-response-query-options";
import { rpcs as formsResponseRPCs } from "~/services/rpcs/forms-response";

// ALL
export const useQuery_All = (param: FormResponseListParam) => {
  const queryOptions = formsResponseQOF.all(param);
  const { data: result } = useSuspenseQuery(queryOptions);
  return { result };
};

export const useQueryData_All = (param: FormResponseListParam) => {
  const { result } = useQuery_All(param);
  return { result };
};

export const useEnsureQueryData_All = async (
  queryClient: QueryClient = useQueryClient(),
  param: FormResponseListParam
) => {
  const queryOptions = formsResponseQOF.all(param);
  const data = await queryClient.ensureQueryData(queryOptions);
  return { data };
};

// DETAIL
export const useQuery_Detail = (param: FormResponseDetailParam) => {
  const queryOptions = formsResponseQOF.detail(param);
  const { data: result, isLoading } = useSuspenseQuery(queryOptions);
  return { result };
};

export const useQueryData_Detail = (param: FormResponseDetailParam) => {
  const { result } = useQuery_Detail(param);
  return { result };
};

export const useEnsureQueryData_Detail = async (
  queryClient: QueryClient = useQueryClient(),
  param: FormResponseDetailParam
) => {
  const queryOptions = formsResponseQOF.detail(param);
  const { data } = await queryClient.ensureQueryData(queryOptions);
  return { data };
};

// QUERIES
export const useQuery_All_Forms = () => {
  const { form_uuid } = useParams({
    from: "/(app)/dashboard/forms/$form_uuid",
  });
  const param = { form_uuid };
  const { result } = useQuery_All(param);
  return result;
};

export const useMutateData = () => {
  const queryClient = useQueryClient();

  const mutateCreate = useMutation({
    mutationFn: formsResponseRPCs.create,
    onSuccess: (data, variables) => {
      console.log(data, " success");
    },
    onSettled: (response) => {
      console.log("settled", response);
    },
  });

  return {
    mutateCreate,
  };
};
