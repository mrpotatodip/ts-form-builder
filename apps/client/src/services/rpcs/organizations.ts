import { hc, parseResponse } from "hono/client";

import type {
  OrganizationParam,
  OrganizationQuery,
  OrganizationJson,
  OrganizationsRPCRoutes,
} from "shared";

const baseURL = import.meta.env.VITE_BASE_URL;
const all = async (param: OrganizationParam, query: OrganizationQuery) => {
  const client = hc<OrganizationsRPCRoutes>(baseURL);
  const result = await parseResponse(
    client.organizations[":author_party_uuid"].$get({
      param,
      query,
    })
  );
  return result;
};

const create = async (json: OrganizationJson) => {
  const client = hc<OrganizationsRPCRoutes>(baseURL);
  const result = await parseResponse(client.organizations.$post({ json }));
  return result;
};

export const rpcs = {
  all,
  create,
};
