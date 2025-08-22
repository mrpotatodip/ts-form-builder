import {
  useSuspenseQuery,
  useQueryClient,
  //   useMutation,
  QueryClient,
} from "@tanstack/react-query";

import { queryOptionFactory as usersQOF } from "~/services/query-options/users-query-options";

export const fetchQuery_Details = async (
  queryClient: QueryClient = useQueryClient()
) => {
  const queryOptions = usersQOF.details();
  const data = await queryClient.fetchQuery(queryOptions);
  return data;
};

export const useQuery_All = () => {
  const queryOptions = usersQOF.all();
  const { data } = useSuspenseQuery(queryOptions);
  return { data };
};

export const useQueryData_All = () => {
  const { data } = useQuery_All();
  return { data };
};

export const useEnsureQueryData_All = async (
  queryClient: QueryClient = useQueryClient()
) => {
  const data = await queryClient.ensureQueryData(usersQOF.all());
  return { data };
};
