import { useCallback, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useLiveQuery, createCollection, eq } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

import { OrganizationSchema } from "shared";
import { rpcs as organizationsRPCs } from "~/services/rpcs/organizations";

// import { useOrganizationDBCollection } from "~/services/hooks/use-organizations-db";
// import { useCollectionQuery as useOrganizationCQ } from "~/services/collections/use-organizations-collection";

import { BuilderForm } from "./test-form";

export const DashboardTest = () => {
  // const { data } = useOrganizationCQ();
  // const param = {
  //   author_party_uuid: "ad5a0626-9b8a-460b-9bbd-960cf505e2ed",
  // };
  // const query = {};

  // const queryClient = useQueryClient();
  // const orgsCollection = createCollection(
  //   queryCollectionOptions({
  //     queryKey: ["orgs"],
  //     queryFn: async () => {
  //       const response = await organizationsRPCs.all(param, query);
  //       if (!response.data) return [];
  //       return response.data;
  //     },
  //     queryClient,
  //     getKey: (item) => item.id,
  //   })
  // );

  // const { data, isLoading } = useLiveQuery((q) =>
  //   q
  //     .from({ orgs: orgsCollection })
  //     .where(({ orgs }) => eq(orgs.status, "active"))
  //     .select(({ orgs }) => ({ id: orgs.id, name: orgs.name }))
  // );

  return (
    <div className="p-8 m-auto">
      <ul className="flex flex-col gap-4">
        {/* {data.map((item) => (
          <li className="w-sm bg-muted p-2" key={item.id}>
            {item.name}
          </li>
        ))} */}
      </ul>

      <br />

      <br />
      <BuilderForm />
    </div>
  );
};
