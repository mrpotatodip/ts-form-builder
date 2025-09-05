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
import { rpcs as formsRPCs } from "~/services/rpcs/forms-public";

// DETAIL
export const useQuery_Public = (param: FormPublicParam) => {
  const queryOptions = formsQOF.detail(param);
  const { data: result, isLoading } = useSuspenseQuery(queryOptions);
  return { result };
};

export const useQueryData_Public = (param: FormPublicParam) => {
  const { result } = useQuery_Public(param);
  return { result };
};

export const useEnsureQueryData_Public = async (
  queryClient: QueryClient = useQueryClient(),
  param: FormPublicParam
) => {
  const queryOptions = formsQOF.detail(param);
  const { data } = await queryClient.ensureQueryData(queryOptions);
  return { data };
};

export const useQuery_Public_Forms = () => {
  const { form_uuid: uuid } = useParams({
    from: "/(public)/$form_uuid",
  });
  const param = { uuid };
  const { result } = useQuery_Public(param);

  return { uuid, data: result.data };
};
