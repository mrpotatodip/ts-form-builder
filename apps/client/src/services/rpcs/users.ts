import { hc, parseResponse } from "hono/client";

import type { UsersRPCRoutes } from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;
export const getUsersRPC = async () => {
  const client = hc<UsersRPCRoutes>(baseURL);
  const result = await parseResponse(client.users.$get());
  return result;
};
