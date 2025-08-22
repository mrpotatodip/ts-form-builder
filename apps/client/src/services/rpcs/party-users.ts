import { hc, parseResponse } from "hono/client";

import type {
  PartyUsersRPCRoutes,
  PartyUserParam,
  PartyUserQuery,
} from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;
const all = async (param: PartyUserParam, query: PartyUserQuery) => {
  const client = hc<PartyUsersRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.partyusers[":userId"].$get({
      param,
      query,
    })
  );
  return result;
};

export const rpcs = {
  all,
};
