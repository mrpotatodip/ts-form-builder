import { hc, parseResponse } from "hono/client";

import type { UsersRPCRoutes, UserParam, UserQuery } from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;
const all = async (param: UserParam, query: UserQuery) => {
  const client = hc<UsersRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.users[":userId"].$get({
      param,
      query,
    })
  );
  return result;
};

export const rpcs = {
  all,
};
