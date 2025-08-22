import { eq } from "drizzle-orm";

import { DBNeonConnect } from "../..";

import { tbl_organization } from "../../db-tables/tbl-organization";
import type { OrganizationParam, OrganizationQuery } from "../../schemas-types";

export const all = async (
  db: DBNeonConnect,
  param: OrganizationParam,
  query: OrganizationQuery
) => {
  const { author_party_uuid } = param;
  const data = await db
    .select()
    .from(tbl_organization)
    .where(eq(tbl_organization.author_party_uuid, author_party_uuid));
  return data;
};
