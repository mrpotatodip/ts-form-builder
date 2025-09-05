import { queryOptions } from "@tanstack/react-query";

import type { FormResponseListParam, FormResponseDetailParam } from "shared";
import { queryKeyFactory as formsResponseQKF } from "~/services/constants/forms-response-factory";
import { rpcs as formsResponseRPCs } from "~/services/rpcs/forms-response";

export const queryOptionFactory = {
  all: (param: FormResponseListParam) =>
    queryOptions({
      queryKey: formsResponseQKF.all(param),
      queryFn: async () => await formsResponseRPCs.list(param),
    }),
  detail: (param: FormResponseDetailParam) =>
    queryOptions({
      queryKey: formsResponseQKF.detail(param),
      queryFn: async () => await formsResponseRPCs.detail(param),
    }),
};
