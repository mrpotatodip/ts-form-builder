// import { useMemo } from "react";
// import { useRouteContext } from "@tanstack/react-router";
// import { createCollection, useLiveQuery, eq } from "@tanstack/react-db";
// import { queryCollectionOptions } from "@tanstack/query-db-collection";

// import { OrganizationSchema } from "shared";
// import type {
//   OrganizationParam,
//   OrganizationQuery,
//   Organization,
// } from "shared";
// import { queryKeyFactory as organizationsQKF } from "~/services/constants/organizations-factory";
// import { rpcs as organizationsRPC } from "~/services/rpcs/organizations";
// import { queryClient } from "~/queryClient";

// const useParams = () => {
//   const { partyUserState } = useRouteContext({ from: "/(app)" });
//   const [{ party_uuid: author_party_uuid }] = partyUserState;
//   const param = { author_party_uuid };
//   const query = {};
//   return { param, query };
// };

// export const collectionFn = (
//   param: OrganizationParam,
//   query: OrganizationQuery
// ) =>
//   createCollection(
//     queryCollectionOptions({
//       queryClient,
//       queryKey: organizationsQKF.all(param),
//       queryFn: async () => {
//         const response = await organizationsRPC.all(param, query);
//         if (!response.data) return [];
//         return response.data;
//       },
//       schema: OrganizationSchema,
//       getKey: (item) => item.id,
//       onInsert: async ({ transaction }) => {
//         const { modified } = transaction.mutations[0];
//         const response = await organizationsRPC.create(modified);
//         if (!response.data) return [];
//         return response.data;
//       },
//     })
//   );

// export const useCollectionQuery = () => {
//   const { param, query } = useParams();
//   const collection = useMemo(() => collectionFn(param, query), [param, query]);

//   const { data } = useLiveQuery((q) =>
//     q
//       .from({ data: collection })
//       .where(({ data }) => eq(data.status, "active"))
//       .select(({ data }) => ({ id: data.id, name: data.name }))
//   );

//   const create = (data: Organization) => collection.insert(data);

//   return { data, create };
// };
