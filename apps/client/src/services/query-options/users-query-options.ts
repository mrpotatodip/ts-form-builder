import { queryOptions } from "@tanstack/react-query";

import type { UserParam, UserQuery } from "shared";
import { queryKeyFactory as usersQKF } from "~/services/constants/users-factory";
import { rpcs as usersRPCs } from "~/services/rpcs/users";

export const queryOptionFactory = {
  detail: (param: UserParam, query: UserQuery) =>
    queryOptions({
      queryKey: usersQKF.all(param),
      queryFn: async () => await usersRPCs.all(param, query),
    }),
};
