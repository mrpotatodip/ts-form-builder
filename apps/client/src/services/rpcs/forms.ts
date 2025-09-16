import { hc, parseResponse } from "hono/client";

import type {
  FormsRPCRoutes,
  FormUpdate,
  FormCreate,
  FormListParam,
  FormDetailParam,
  FormQuery,
} from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const clientWithCredentials = hc<FormsRPCRoutes>(baseURL, {
  init: { credentials: "include" },
});

const listDB = async () => {
  const client = clientWithCredentials;
  const result = await parseResponse(client.forms["DB"].$get());

  return result;
};

const createDB = async (payload: { json: FormCreate }) => {
  const { json } = payload;
  const client = clientWithCredentials;
  const result = await parseResponse(
    client.forms["DB"].$post({
      json,
    })
  );

  return result;
};

const updateDB = async (payload: {
  param: FormDetailParam;
  json: FormUpdate;
}) => {
  const { param, json } = payload;
  const client = clientWithCredentials;
  const result = await parseResponse(
    client.forms["DB"][":uuid"].$put({
      param,
      json,
    })
  );

  return result;
};

const list = async (param: FormListParam, query: FormQuery) => {
  const client = hc<FormsRPCRoutes>(baseURL, {
    init: {
      credentials: "include",
    },
  });
  const result = await parseResponse(
    client.forms[":party_uuid"].$get({
      param,
      query,
    })
  );

  return result;
};

const detail = async (param: FormDetailParam) => {
  const client = hc<FormsRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.forms[":party_uuid"].detail[":uuid"].$get({
      param,
    })
  );

  return result;
};

const create = async (payload: { param: FormListParam; json: FormCreate }) => {
  const { param, json } = payload;
  const client = hc<FormsRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.forms[":party_uuid"].$post({
      param,
      json,
    })
  );

  return result;
};

const update = async (payload: {
  param: FormDetailParam;
  json: FormUpdate;
}) => {
  const { param, json } = payload;
  const client = hc<FormsRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.forms[":party_uuid"].update[":uuid"].$put({
      param,
      json,
    })
  );

  return result;
};

export const rpcs = {
  listDB,
  createDB,
  updateDB,
  list,
  detail,
  create,
  update,
};
