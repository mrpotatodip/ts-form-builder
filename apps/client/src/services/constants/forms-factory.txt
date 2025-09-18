import type { FormListParam, FormDetailParam, FormQuery } from "shared";

export const queryKeyFactory = {
  all: (param: FormListParam) => ["forms", param],
  lists: (param: FormListParam) => [...queryKeyFactory.all(param), "list"],
  list: (param: FormListParam, query: FormQuery) => [
    ...queryKeyFactory.lists(param),
    query,
  ],
  details: (param: FormDetailParam) => [
    ...queryKeyFactory.all(param),
    "detail",
  ],
  detail: (param: FormDetailParam) => [
    ...queryKeyFactory.details(param),
    param,
  ],
} as const;
