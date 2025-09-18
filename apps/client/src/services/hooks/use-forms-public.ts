import { useEffect } from "react";
import { toast } from "sonner";

import { useParams, useRouteContext, useRouter } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  useQueryClient,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";

import type { FormPublicParam } from "shared";
import { queryOptionFactory as formsQOF } from "~/services/query-options/forms-public-query-options";

// DETAIL
export const useQuery_Public = (param: FormPublicParam) => {
  const queryOptions = formsQOF.detail(param);
  const { data: result } = useSuspenseQuery(queryOptions);
  return { result };
};

export const useQueryData_Public = (param: FormPublicParam) => {
  const { result } = useQuery_Public(param);
  return { result };
};

export const useEnsureQueryData_Public = async (
  queryClient: QueryClient = useQueryClient(),
  param: FormPublicParam,
) => {
  const queryOptions = formsQOF.detail(param);
  const { data: result } = await queryClient.ensureQueryData(queryOptions);
  // console.log(result, " result ---> ");
  // const { result } = useQuery_Public(param);
  return { result: [] };
};

export const useQuery_Public_Forms = () => {
  const { form_uuid } = useParams({
    from: "/(public)/$form_uuid",
  });
  const param = { uuid: form_uuid };
  const {
    result: { data },
  } = useQuery_Public(param);
  const formDBs = data;

  return { data, formDBs };
};
