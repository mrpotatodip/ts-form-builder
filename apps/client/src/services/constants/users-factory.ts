import type { UserParam, UserQuery } from "shared";

export const queryKeyFactory = {
  all: (param: UserParam) => ["users", param],
  lists: (param: UserParam) => [...queryKeyFactory.all(param), "list"],
  list: (param: UserParam, query: UserQuery) => [
    ...queryKeyFactory.lists(param),
    query,
  ],
  details: (param: UserParam) => [...queryKeyFactory.all(param), "detail"],
  detail: (param: UserParam) => [...queryKeyFactory.details(param), param],
} as const;
