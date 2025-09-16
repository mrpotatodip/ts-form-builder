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

import {
  FormSchema,
  FormInitValues,
  Form,
  FormCreate,
  FormUpdate,
  BuilderFields,
} from "shared";
import { queryClient } from "~/queryClient";
import { rpcs as formsRPCs } from "~/services/rpcs/forms";

export const collections = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["forms"],
    queryFn: async () => {
      const response = await formsRPCs.listDB();
      const data = response.data.map(({ id, ...item }) => item);
      return data ?? [];
    },
    schema: FormSchema,
    getKey: (item) => item.uuid,
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await formsRPCs.createDB({ json: modified });
    },
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      await formsRPCs.updateDB({
        param: { uuid: original.uuid },
        json: modified,
      });
    },
  }),
);

export const useCollectionsLiveQuery = ({
  status = undefined,
  form_uuid = undefined,
}: {
  status?: string;
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

  const dataset = useMemo(() => {
    if (status === "draft") return draft;
    if (status === "published") return published;
    return all;
  }, [status, all, draft, published]);

  const handleCreate = (payload: FormCreate) => {
    collections.insert(payload);
  };

  const handleUpdate = (payload: FormUpdate) => {
    collections.update(form_uuid, (draft) => {
      Object.assign(draft, payload);
      // draft.json = payload.json;
    });
  };

  const handleUpdateFields = (payload: BuilderFields[]) => {
    collections.update(form_uuid, (draft) => {
      draft.json = { fields: payload };
    });
  };

  return {
    dataset,
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
  const { all, draft, published, handleCreate } = useCollectionsLiveQuery({
    status,
  });

  const dataset = useMemo(() => {
    if (status === "draft") return draft;
    if (status === "published") return published;
    return all;
  }, [status, all, draft, published]);

  const { data, isError, isLoading, isReady, isIdle, isCleanedUp } = dataset;

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

  const { data, isError, isLoading, isReady, isIdle, isCleanedUp } = dataset;

  return {
    form_uuid,
    data,
    isLoading,
    handleUpdate,
    handleUpdateFields,
  };
};
