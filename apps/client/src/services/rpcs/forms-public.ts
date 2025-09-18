import { hc, parseResponse } from "hono/client";

import type { FormsPublicRPCRoutes, FormPublicParam } from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const detail = async (param: FormPublicParam) => {
  const client = hc<FormsPublicRPCRoutes>(baseURL);
  const result = await parseResponse(
    client["public"][":uuid"].$get({
      param,
    }),
  );

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
  detail,
};
