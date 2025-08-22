import {
  useSuspenseQuery,
  useQueryClient,
  //   useMutation,
  QueryClient,
} from "@tanstack/react-query";

import type { OrganizationParam, OrganizationQuery } from "shared";
import { queryOptionFactory as organizationsQOF } from "~/services/query-options/organizations-query-options";

export const useQuery_All = (
  param: OrganizationParam,
  query: OrganizationQuery
) => {
  const queryOptions = organizationsQOF.all(param, query);
  const { data } = useSuspenseQuery(queryOptions);
  return { data };
};

export const useQueryData_All = (
  param: OrganizationParam,
  query: OrganizationQuery
) => {
  const { data } = useQuery_All(param, query);
  return { data };
};

export const useEnsureQueryData_All = async (
  queryClient: QueryClient = useQueryClient(),
  param: OrganizationParam,
  query: OrganizationQuery = {}
) => {
  const queryOptions = organizationsQOF.all(param, query);
  const data = await queryClient.ensureQueryData(queryOptions);
  return { data };
};
