import { queryOptions } from "@tanstack/react-query";

import type { OrganizationParam, OrganizationQuery } from "shared";
import { queryKeyFactory as organizationsQKF } from "~/services/constants/organizations-factory";
import { rpcs as organizationsRPCs } from "~/services/rpcs/organizations";

export const queryOptionFactory = {
  all: (param: OrganizationParam, query: OrganizationQuery) =>
    queryOptions({
      queryKey: organizationsQKF.all(param),
      queryFn: async () => {
        const response = await organizationsRPCs.all(param, query);
        if (!response.data) return [];
        return response.data;
      },
    }),
};

export const queryOptionFactoryX = {
  all: (param: OrganizationParam, query: OrganizationQuery) =>
    queryOptions({
      queryKey: organizationsQKF.all(param),
      queryFn: async () => await organizationsRPCs.all(param, query),
    }),
};
