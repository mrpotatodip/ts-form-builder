import { hc, parseResponse } from "hono/client";

import type {
  FormsRPCRoutes,
  FormUpdate,
  FormCreate,
  FormDetailParam,
} from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const clientWithCredentials = hc<FormsRPCRoutes>(baseURL, {
  init: { credentials: "include" },
});

const list = async () => {
  const client = clientWithCredentials;
  const result = await parseResponse(client.forms.$get());
  return result;
};

const create = async (payload: { json: FormCreate }) => {
  const { json } = payload;
  const client = clientWithCredentials;
  const result = await parseResponse(
    client.forms.$post({
      json,
    }),
  );
  return result;
};

const update = async (payload: {
  param: FormDetailParam;
  json: FormUpdate;
}) => {
  const { param, json } = payload;
  const client = clientWithCredentials;
  const result = await parseResponse(
    client.forms[":uuid"].$put({
      param,
      json,
    }),
  );
  return result;
};

export const rpcs = {
  list,
  create,
  update,
};
