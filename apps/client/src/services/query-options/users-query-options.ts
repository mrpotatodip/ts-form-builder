import { queryOptions } from "@tanstack/react-query";

import { queryKeyFactory as usersQKF } from "~/services/constants/users-factory";
import { getUsersRPC } from "~/services/rpcs/users";
import { authServerSession } from "~/services/better-auth/auth-server";

export const queryOptionFactory = {
  all: () =>
    queryOptions({
      queryKey: usersQKF.all(),
      queryFn: async () => await getUsersRPC(),
    }),
  details: () =>
    queryOptions({
      queryKey: usersQKF.details(),
      queryFn: async () => await authServerSession(),
    }),
};
