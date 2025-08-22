import { queryOptions } from "@tanstack/react-query";

import type { PartyUserParam, PartyUserQuery } from "shared";
import { queryKeyFactory as partyUsersQKF } from "~/services/constants/party-users-factory";
import { rpcs as partyUsersRPCs } from "~/services/rpcs/party-users";

export const queryOptionFactory = {
  detail: (param: PartyUserParam, query: PartyUserQuery) =>
    queryOptions({
      queryKey: partyUsersQKF.all(param),
      queryFn: async () => await partyUsersRPCs.all(param, query),
    }),
};
