import { createCollection, eq, useLiveQuery } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

import type { OrganizationParam, OrganizationQuery } from "shared";
import { queryKeyFactory as organizationsQKF } from "~/services/constants/organizations-factory";
import { rpcs as organizationsRPCs } from "~/services/rpcs/organizations";

// export const dbQueryOptionFactory = {
//   all: (param: OrganizationParam, query: OrganizationQuery) =>
//     queryOptions({
//       queryKey: organizationsQKF.all(param),
//       queryFn: async () => await organizationsRPCs.all(param, query),
//     }),
// };
