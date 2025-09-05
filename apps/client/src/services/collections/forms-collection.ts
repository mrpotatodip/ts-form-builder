import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

import { FormSchema } from "shared";
import { queryClient } from "~/queryClient";
import { rpcs as formsRPCs } from "~/services/rpcs/forms";

export const formsCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["forms"],
    queryFn: async () => {
      const param = { party_uuid: "179f4097-2fac-4de2-ba0c-4132fbb6896a" };
      const query = {};
      const response = await formsRPCs.list(param, query);
      return response.data ?? [];
      //   const response = await fetch("/api/todos");
      //   return response.json();
    },
    schema: FormSchema,
    getKey: (item) => item.id,
    // onInsert: async ({ transaction }) => {
    //   const { modified } = transaction.mutations[0];
    //   const response = await organizationsRPC.create(modified);
    //   if (!response.data) return [];
    //   return response.data;
    // },
  })
);
