import { useEffect } from "react";
import { toast } from "sonner";

import { useParams, useRouteContext, useRouter } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  useQueryClient,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";

import type { FormListParam, FormDetailParam, FormQuery } from "shared";
import { queryOptionFactory as formsQOF } from "~/services/query-options/forms-query-options";
import { rpcs as formsRPCs } from "~/services/rpcs/forms";
import { useDataStore as useDataStoreCore } from "~/components/app/builder/form/core/use-data-store";

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
  const param = { party_uuid, uuid };
  const { result } = useQuery_Detail(param);
  const initializeData = useDataStoreCore((state) => state.initializeData);
  const fields = useDataStoreCore((state) => state.fields);
  const formDBs = useDataStoreCore((state) => state.formDBs);
  const isDirty = useDataStoreCore((state) => state.isDirty);

  useEffect(() => {
    const form = result.data;
    const fields = form[0].json["fields"];
    initializeData(fields, form);
  }, [JSON.stringify(result), initializeData]);

  return { uuid, data: result.data, fields, formDBs, isDirty };
};

export const useMutateData = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userState } = useRouteContext({ from: "/(app)" });
  const cleanUpData = useDataStoreCore((state) => state.cleanUpData);

  const mutateCreate = useMutation({
    mutationFn: formsRPCs.create,
    onSuccess: (data, variables) => {
      toast("Successfully created a form");
    },
    onSettled: (response) => {
      if (response) {
        const [{ party_uuid, uuid: form_uuid }] = response.data;
        router.navigate({
          to: "/dashboard/forms/$form_uuid/edit",
          params: { form_uuid },
        });
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
      toast("The form infos. has been update");
    },
    onSettled: (response) => {
      if (response) {
        const [{ party_uuid, uuid }] = response.data;
        const param = { party_uuid, uuid };
        const { queryKey } = formsQOF.detail(param);
        queryClient.invalidateQueries({ queryKey });
        cleanUpData();
      }
    },
  });

  return {
    mutateCreate,
    mutateUpdate,
  };
};
