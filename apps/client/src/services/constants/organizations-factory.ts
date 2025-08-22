import type { OrganizationParam, OrganizationQuery } from "shared";

export const queryKeyFactory = {
  all: (param: OrganizationParam) => ["organizations", param],
  lists: (param: OrganizationParam) => [...queryKeyFactory.all(param), "list"],
  list: (param: OrganizationParam, query: OrganizationQuery) => [
    ...queryKeyFactory.lists(param),
    query,
  ],
  details: (param: OrganizationParam) => [
    ...queryKeyFactory.all(param),
    "detail",
  ],
  detail: (param: OrganizationParam) => [
    ...queryKeyFactory.details(param),
    param,
  ],
} as const;
