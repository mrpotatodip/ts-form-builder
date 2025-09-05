import { queryOptions } from "@tanstack/react-query";

import type { FormPublicParam } from "shared";
import { queryKeyFactory as formsQKF } from "~/services/constants/forms-public-factory";
import { rpcs as formsRPCs } from "~/services/rpcs/forms-public";

export const queryOptionFactory = {
  detail: (param: FormPublicParam) =>
    queryOptions({
      queryKey: formsQKF.detail(param),
      queryFn: async () => await formsRPCs.detail(param),
    }),
};
