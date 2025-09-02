import { queryOptions } from "@tanstack/react-query";

import type { FormListParam, FormDetailParam, FormQuery } from "shared";
import { queryKeyFactory as formsQKF } from "~/services/constants/forms-factory";
import { rpcs as formsRPCs } from "~/services/rpcs/forms";

export const queryOptionFactory = {
  all: (param: FormListParam, query: FormQuery) =>
    queryOptions({
      queryKey: formsQKF.all(param),
      queryFn: async () => await formsRPCs.list(param, query),
    }),
  detail: (param: FormDetailParam) =>
    queryOptions({
      queryKey: formsQKF.detail(param),
      queryFn: async () => await formsRPCs.detail(param),
    }),
};
