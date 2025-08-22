import { useRouteContext } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useLiveQuery,
  createCollection,
  createOptimisticAction,
  eq,
} from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

import { OrganizationSchema } from "shared";
import type {
  Organization,
  OrganizationParam,
  OrganizationQuery,
  OrganizationJson,
} from "shared";
import { queryOptionFactory as organizationsQOF } from "~/services/query-options/organizations-query-options";
import { rpcs as organizationsRPCs } from "~/services/rpcs/organizations";

export const useOrganizationDBCollection = () => {
  const { partyUserState } = useRouteContext({
    from: "/(app)",
  });

  const [{ party_uuid: author_party_uuid }] = partyUserState;
  const param = { author_party_uuid };
  const query = {};

  const queryClient = useQueryClient();
  const orgsCollection = createCollection(
    queryCollectionOptions({
      schema: OrganizationSchema,
      queryKey: ["orgs"],
      queryFn: async () => {
        const response = await organizationsRPCs.all(param, query);
        if (!response.data) return [];
        return response.data;
      },
      queryClient,
      getKey: (item) => item.id,
      onInsert: async ({ transaction }) => {
        console.log("transaction trigger");
        const { modified } = transaction.mutations[0];
        const response = await organizationsRPCs.create(modified);
        if (!response.data) return [];
        return response.data;
      },
    })
  );

  const { data, isLoading } = useLiveQuery((q) =>
    q
      .from({ orgs: orgsCollection })
      .where(({ orgs }) => eq(orgs.status, "active"))
      .select(({ orgs }) => ({ id: orgs.id, name: orgs.name }))
  );

  const createOrgs2 = (orgs: Organization) => {
    // Instantly applies optimistic state, then syncs to server
    orgsCollection.insert({
      ...orgs,
      createdAt: String(orgs.createdAt),
    });
  };

  const createOrgs = createOptimisticAction<Organization>({
    onMutate: (orgs) => {
      orgsCollection.insert({
        ...orgs,
        createdAt: String(orgs.createdAt),
      });
    },
    mutationFn: async (json, params) => {
      const response = await organizationsRPCs.create(json);
      if (!response.data) return [];
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    createOrgs,
    createOrgs2,
  };
};
