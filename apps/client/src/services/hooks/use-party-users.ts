import {
  useSuspenseQuery,
  useQueryClient,
  //   useMutation,
  QueryClient,
} from "@tanstack/react-query";

import type { PartyUserParam, PartyUserQuery } from "shared";
import { queryOptionFactory as partyUsersQOF } from "~/services/query-options/party-users-query-options";

export const useQuery_Detail = (
  param: PartyUserParam,
  query: PartyUserQuery = {}
) => {
  const queryOptions = partyUsersQOF.detail(param, query);
  const { data } = useSuspenseQuery(queryOptions);
  return { data };
};

export const useQueryData_Detail = (
  param: PartyUserParam,
  query: PartyUserQuery = {}
) => {
  const { data } = useQuery_Detail(param, query);
  return { data };
};

export const useEnsureQueryData_Detail = async (
  queryClient: QueryClient = useQueryClient(),
  param: PartyUserParam,
  query: PartyUserQuery = {}
) => {
  const queryOptions = partyUsersQOF.detail(param, query);
  const data = await queryClient.ensureQueryData(queryOptions);
  return { data };
};
