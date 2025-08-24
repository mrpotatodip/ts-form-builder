import { queryOptions } from "@tanstack/react-query";

import { queryKeyFactory as baUsersQKF } from "~/services/constants/ba-users-factory";
import { getUsersRPC } from "~/services/rpcs/ba-users";
import { authServerSession } from "~/services/better-auth/auth-server";

export const queryOptionFactory = {
  all: () =>
    queryOptions({
      queryKey: baUsersQKF.all(),
      queryFn: async () => await getUsersRPC(),
    }),
  details: () =>
    queryOptions({
      queryKey: baUsersQKF.details(),
      queryFn: async () => await authServerSession(),
    }),
};
