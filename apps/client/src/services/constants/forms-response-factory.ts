import type { FormResponseListParam, FormResponseDetailParam } from "shared";

export const queryKeyFactory = {
  all: (param: FormResponseListParam) => ["forms", param],
  lists: (param: FormResponseListParam) => [
    ...queryKeyFactory.all(param),
    "list",
  ],
  list: (param: FormResponseListParam) => [...queryKeyFactory.lists(param)],
  details: (param: FormResponseDetailParam) => [
    ...queryKeyFactory.all(param),
    "detail",
  ],
  detail: (param: FormResponseDetailParam) => [
    ...queryKeyFactory.details(param),
    param,
  ],
} as const;
