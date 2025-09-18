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

import { FormSchema, FormCreate, FormUpdate, BuilderFields } from "shared";
import { QueryClient } from "@tanstack/query-core";
import { rpcs as formsRPCs } from "~/services/rpcs/forms";

const queryClient = new QueryClient();

export const collections = createCollection(
  queryCollectionOptions({
    id: "forms",
    // refetchInterval: 3000,
    queryClient,
    queryKey: ["forms"],
    schema: FormSchema,
    getKey: (item) => item.uuid,
    queryFn: async () => {
      const { data } = await formsRPCs.list();
      return data;
    },
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await formsRPCs.create({ json: modified });
    },
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      await formsRPCs.update({
        param: { uuid: original.uuid },
        json: modified,
      });
    },
  }),
);

export const useCollectionsLiveQuery = ({
  form_uuid = undefined,
}: {
  form_uuid?: string;
}) => {
  const detail = useLiveQuery((q) =>
    q.from({ item: collections }).where(({ item }) => eq(item.uuid, form_uuid)),
  );

  const all = useLiveQuery((q) =>
    q.from({ item: collections }).orderBy(({ item }) => item.createdAt, "desc"),
  );

  const draft = useLiveQuery((q) =>
    q
      .from({ item: collections })
      .where(({ item }) => eq(item.status, "draft"))
      .orderBy(({ item }) => item.createdAt, "desc"),
  );

  const published = useLiveQuery((q) =>
    q
      .from({ item: collections })
      .where(({ item }) => eq(item.status, "published"))
      .orderBy(({ item }) => item.createdAt, "desc"),
  );

  const handleCreate = (payload: FormCreate) => {
    collections.insert(payload);
  };

  const handleUpdate = (payload: FormUpdate) => {
    collections.update(form_uuid, (draft: FormUpdate) => {
      Object.assign(draft, payload);
    });
  };

  const handleUpdateFields = (payload: BuilderFields[]) => {
    collections.update(form_uuid, (draft) => {
      draft.json = { fields: payload };
    });
  };

  return {
    detail,
    all,
    draft,
    published,
    handleCreate,
    handleUpdate,
    handleUpdateFields,
  };
};

export const useCollections = () => {
  const { status } = useSearch({ from: "/(app)/dashboard/forms/" });
  const { all, draft, published, handleCreate } = useCollectionsLiveQuery({});

  const dataset = useMemo(() => {
    if (status === "draft") return draft;
    if (status === "published") return published;
    return all;
  }, [status, all, draft, published]);

  const { data, isLoading } = dataset;

  return {
    data,
    isLoading,
    handleCreate,
  };
};

export const useCollectionsDetail = () => {
  const { form_uuid } = useParams({
    from: "/(app)/dashboard/forms/$form_uuid",
  });

  const { detail, handleUpdate, handleUpdateFields } = useCollectionsLiveQuery({
    form_uuid,
  });

  const dataset = useMemo(() => {
    return detail;
  }, [form_uuid, detail]);

  const { data, isLoading } = dataset;

  return {
    form_uuid,
    data,
    isLoading,
    handleUpdate,
    handleUpdateFields,
  };
};
