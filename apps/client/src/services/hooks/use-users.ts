import {
  useSuspenseQuery,
  useQueryClient,
  //   useMutation,
  QueryClient,
} from "@tanstack/react-query";

import type { UserParam, UserQuery } from "shared";
import { queryOptionFactory as usersQOF } from "~/services/query-options/users-query-options";

export const useQuery_Detail = (param: UserParam, query: UserQuery = {}) => {
  const queryOptions = usersQOF.detail(param, query);
  const { data } = useSuspenseQuery(queryOptions);
  return { data };
};

export const useQueryData_Detail = (
  param: UserParam,
  query: UserQuery = {}
) => {
  const { data } = useQuery_Detail(param, query);
  return { data };
};

export const useEnsureQueryData_Detail = async (
  queryClient: QueryClient = useQueryClient(),
  param: UserParam,
  query: UserQuery = {}
) => {
  const queryOptions = usersQOF.detail(param, query);
  const data = await queryClient.ensureQueryData(queryOptions);
  return { data };
};
