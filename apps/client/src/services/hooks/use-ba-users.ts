import {
  useSuspenseQuery,
  useQueryClient,
  //   useMutation,
  QueryClient,
} from "@tanstack/react-query";

import { queryOptionFactory as baUsersQOF } from "~/services/query-options/ba-users-query-options";

export const fetchQuery_Details = async (
  queryClient: QueryClient = useQueryClient(),
) => {
  const queryOptions = baUsersQOF.details();
  const data = await queryClient.fetchQuery(queryOptions);
  return data;
};

export const useQuery_All = () => {
  const queryOptions = baUsersQOF.all();
  const { data } = useSuspenseQuery(queryOptions);
  return { data };
};

export const useQueryData_All = () => {
  const { data } = useQuery_All();
  return { data };
};

export const useEnsureQueryData_All = async (
  queryClient: QueryClient = useQueryClient(),
) => {
  const data = await queryClient.ensureQueryData(baUsersQOF.all());
  return { data };
};
