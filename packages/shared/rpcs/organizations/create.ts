import { eq } from "drizzle-orm";

import { DBNeonConnect } from "../..";

import { tbl_organization } from "../../db-tables/tbl-organization";
import type { OrganizationJson } from "../../schemas-types";

export const create = async (db: DBNeonConnect, json: OrganizationJson) => {
  const transactions = await db.transaction(async (tx) => {
    // const new_party = await tx
    //   .insert(tbl_hodl_party)
    //   .values({ type: "organization" })
    //   .returning();
    // const organization = await tx
    //   .insert(tbl_organization)
    //   .values({
    //     ...json,
    //     status: "active",
    //   })
    //   .returning();
    // return {
    //   organization,
    // };
  });

  // return transactions.organization;
  return [];
};
