import { useParams, useRouteContext } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  useQueryClient,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";

import type { FormListParam, FormDetailParam, FormQuery } from "shared";
import { queryOptionFactory as formsQOF } from "~/services/query-options/forms-query-options";
import { rpcs as formsRPCs } from "~/services/rpcs/forms";
import {
  useDataMutation as useDataMutationCore,
  useDataQuery as useDataQueryCore,
} from "~/components/app/builder/form/core/use-data-query-core";
import { Builder } from "~/components/app/builder/form/core/schema-core";

import { useEffect } from "react";

// ALL
export const useQuery_All = (param: FormListParam, query: FormQuery = {}) => {
  const queryOptions = formsQOF.all(param, query);
  const { data: result } = useSuspenseQuery(queryOptions);
  return { result };
};

export const useQueryData_All = (
  param: FormListParam,
  query: FormQuery = {}
) => {
  const { result } = useQuery_All(param, query);
  return { result };
};

export const useEnsureQueryData_All = async (
  queryClient: QueryClient = useQueryClient(),
  param: FormListParam,
  query: FormQuery = {}
) => {
  const queryOptions = formsQOF.all(param, query);
  const data = await queryClient.ensureQueryData(queryOptions);
  return { data };
};

// DETAIL
export const useQuery_Detail = (param: FormDetailParam) => {
  const queryOptions = formsQOF.detail(param);
  const { data: result, isLoading } = useSuspenseQuery(queryOptions);
  return { result };
};

export const useQueryData_Detail = (
  param: FormDetailParam,
  query: FormQuery = {}
) => {
  const { result } = useQuery_Detail(param);
  return { result };
};

export const useEnsureQueryData_Detail = async (
  queryClient: QueryClient = useQueryClient(),
  param: FormDetailParam
) => {
  const queryOptions = formsQOF.detail(param);
  const { data } = await queryClient.ensureQueryData(queryOptions);
  return { data };
};

// QUERIES
export const useQuery_All_Forms = () => {
  const { userState } = useRouteContext({ from: "/(app)" });
  const [{ party_uuid }] = userState;
  const param: FormListParam = { party_uuid };
  const query: FormQuery = {};
  const { result } = useQuery_All(param, query);
  return result;
};

export const useQuery_Detail_Forms = () => {
  const { userState } = useRouteContext({ from: "/(app)" });
  const { form_uuid: uuid } = useParams({
    from: "/(app)/dashboard/forms/$form_uuid",
  });
  const [{ party_uuid }] = userState;
  const param: FormDetailParam = { party_uuid, uuid };
  const { result } = useQuery_Detail(param);
  const { mutate: mutateBuilder, isPending } = useDataMutationCore();
  const { fields } = useDataQueryCore();

  const [{ json }] = result.data;
  const fieldsData = json["fields"] as Builder[];

  useEffect(() => {
    console.log(fieldsData, " ---- fieldsData");
    mutateBuilder({
      data: fieldsData,
      action: "update",
    });
  }, [JSON.stringify(fieldsData), mutateBuilder]);

  return { uuid, result, fields };
};

export const useMutateData = () => {
  const queryClient = useQueryClient();
  const { userState } = useRouteContext({ from: "/(app)" });
  const [{ party_uuid: party_uuid }] = userState;

  const mutateCreate = useMutation({
    mutationFn: formsRPCs.create,
    onSuccess: (data, variables) => {
      console.log(data, " success");
    },
    onSettled: (response) => {
      if (response) {
        const [{ party_uuid: party_uuid }] = response.data;
        const param: FormListParam = { party_uuid };
        const query: FormQuery = {};
        const { queryKey } = formsQOF.all(param, query);
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });

  const mutateUpdate = useMutation({
    mutationFn: formsRPCs.update,
    onSuccess: (data, variables) => {
      console.log(data, " success");
    },
    onSettled: (response) => {
      if (response) {
        const [{ party_uuid, uuid }] = response.data;
        const param: FormDetailParam = { party_uuid, uuid };
        const { queryKey } = formsQOF.detail(param);
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });

  return {
    mutateCreate,
    mutateUpdate,
  };
};
