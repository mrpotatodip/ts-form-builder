import type { FormPublicParam } from "shared";

export const queryKeyFactory = {
  all: (param: "") => ["forms-public", param],
  lists: (param: "") => [...queryKeyFactory.all(param), "list"],
  list: (param: "", query: "") => [...queryKeyFactory.lists(param), query],
  details: (param: FormPublicParam) => [...queryKeyFactory.all(""), "detail"],
  detail: (param: FormPublicParam) => [
    ...queryKeyFactory.details(param),
    param,
  ],
} as const;
