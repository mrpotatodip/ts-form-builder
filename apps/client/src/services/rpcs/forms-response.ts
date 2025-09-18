import { hc, parseResponse } from "hono/client";

import type { FormsResponseRPCRoutes } from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const clientWithCredentials = hc<FormsResponseRPCRoutes>(baseURL, {
  init: { credentials: "include" },
});

const list = async () => {
  const client = clientWithCredentials;
  const result = await parseResponse(client["forms-response"].$get());

  return result;
};

// const create = async (payload: {
//   param: FormResponseListParam;
//   json: FormResponseCreate;
// }) => {
//   const { param, json } = payload;
//   const client = clientWithCredentials;
//   const result = await parseResponse(
//     client["forms-response"][":form_uuid"].$post({
//       param,
//       json,
//     }),
//   );

//   return result;
// };

export const rpcs = {
  list,
};
