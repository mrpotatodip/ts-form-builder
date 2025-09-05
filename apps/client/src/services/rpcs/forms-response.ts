import { hc, parseResponse } from "hono/client";

import type {
  FormsResponseRPCRoutes,
  FormResponseCreate,
  FormResponseListParam,
  FormResponseDetailParam,
} from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;

const list = async (param: FormResponseListParam) => {
  const client = hc<FormsResponseRPCRoutes>(baseURL);
  const result = await parseResponse(
    client["forms-response"][":form_uuid"].$get({
      param,
    })
  );

  return result;
};

const detail = async (param: FormResponseDetailParam) => {
  const client = hc<FormsResponseRPCRoutes>(baseURL);
  const result = await parseResponse(
    client["forms-response"][":form_uuid"].detail[":uuid"].$get({
      param,
    })
  );

  return result;
};

const create = async (payload: {
  param: FormResponseListParam;
  json: FormResponseCreate;
}) => {
  const { param, json } = payload;
  const client = hc<FormsResponseRPCRoutes>(baseURL);
  const result = await parseResponse(
    client["forms-response"][":form_uuid"].$post({
      param,
      json,
    })
  );

  return result;
};

export const rpcs = {
  list,
  detail,
  create,
};
