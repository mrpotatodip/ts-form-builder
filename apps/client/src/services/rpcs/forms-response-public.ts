import { hc, parseResponse } from "hono/client";

import type {
  FormResponsePublicParam,
  FormResponsePublicCreate,
  FormsResponsePublicRPCRoutes,
} from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const create = async (payload: {
  param: FormResponsePublicParam;
  json: FormResponsePublicCreate;
}) => {
  const { param, json } = payload;
  const client = hc<FormsResponsePublicRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.public[":form_uuid"].$post({
      param,
      json,
    }),
  );

  return result;
};

export const rpcs = {
  create,
};
