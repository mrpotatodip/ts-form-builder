import { hc, parseResponse } from "hono/client";

import type { FormsPublicRPCRoutes, FormPublicParam } from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const detail = async (param: FormPublicParam) => {
  const client = hc<FormsPublicRPCRoutes>(baseURL);
  const result = await parseResponse(
    client["forms-public"][":uuid"].$get({
      param,
    })
  );

  return result;
};

export const rpcs = {
  detail,
};
