import { hc, parseResponse } from "hono/client";

import type { BAUsersRPCRoutes } from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;
export const getUsersRPC = async () => {
  const client = hc<BAUsersRPCRoutes>(baseURL);
  const result = await parseResponse(client["ba-users"].$get());
  return result;
};
