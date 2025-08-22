import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

import { OrganizationSchema } from "shared";
import type { OrganizationParam, OrganizationQuery } from "shared";
import { queryKeyFactory as organizationsQKF } from "~/services/constants/organizations-factory";
import { rpcs as organizationsRPC } from "~/services/rpcs/organizations";
import { queryClient } from "~/queryClient";

export const collectionFn = (
  param: OrganizationParam,
  query: OrganizationQuery
) =>
  createCollection(
    queryCollectionOptions({
      queryClient,
      queryKey: organizationsQKF.all(param),
      queryFn: async () => {
        const response = await organizationsRPC.all(param, query);
        if (!response.data) return [];
        return response.data;
      },
      schema: OrganizationSchema,
      getKey: (item) => item.id,
      onInsert: async ({ transaction }) => {
        const { modified } = transaction.mutations[0];
        const response = await organizationsRPC.create(modified);
        if (!response.data) return [];
        return response.data;
      },
    })
  );
