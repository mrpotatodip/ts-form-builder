import { useCallback, useEffect, useMemo } from "react";
import {
  createCollection,
  eq,
  not,
  inArray,
  Query,
  useLiveQuery,
  createLiveQueryCollection,
} from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { useParams, useSearch } from "@tanstack/react-router";

import { FormResponseSchema } from "shared";
// import { queryClient } from "~/queryClient";
import { QueryClient } from "@tanstack/query-core";
import { rpcs as formsRPCs } from "~/services/rpcs/forms-response";

const queryClient = new QueryClient();

export const collections = createCollection(
  queryCollectionOptions({
    id: "forms-response",
    // refetchInterval: 3000,
    queryClient,
    queryKey: ["forms-response"],
    schema: FormResponseSchema,
    getKey: (item) => item.uuid,
    queryFn: async () => {
      const { data } = await formsRPCs.list();
      return data;
    },
  }),
);

export const useCollectionsLiveQuery = ({
  form_uuid,
}: {
  form_uuid?: string;
}) => {
  const detail = useLiveQuery((q) =>
    q
      .from({ item: collections })
      .where(({ item }) => eq(item.form_uuid, form_uuid)),
  );

  const all = useLiveQuery((q) =>
    q.from({ item: collections }).orderBy(({ item }) => item.createdAt, "desc"),
  );

  return {
    all,
    detail,
  };
};

export const useCollections = () => {
  const { all } = useCollectionsLiveQuery({});

  const { data, isLoading } = all;

  return {
    data,
    isLoading,
  };
};

export const useCollectionsDetail = () => {
  const { form_uuid } = useParams({
    from: "/(app)/dashboard/forms/$form_uuid",
  });
  const { detail } = useCollectionsLiveQuery({ form_uuid });

  const { data, isLoading, isReady } = detail;

  return {
    form_uuid,
    data,
    isLoading,
  };
};
