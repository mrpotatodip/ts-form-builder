import type { PartyUserParam, PartyUserQuery } from "shared";

export const queryKeyFactory = {
  all: (param: PartyUserParam) => ["party-users", param],
  lists: (param: PartyUserParam) => [...queryKeyFactory.all(param), "list"],
  list: (param: PartyUserParam, query: PartyUserQuery) => [
    ...queryKeyFactory.lists(param),
    query,
  ],
  details: (param: PartyUserParam) => [...queryKeyFactory.all(param), "detail"],
  detail: (param: PartyUserParam) => [...queryKeyFactory.details(param), param],
} as const;
