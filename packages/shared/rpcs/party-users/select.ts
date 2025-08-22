import { eq } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_party_user } from "../../db-tables/tbl-party-user";
import type { PartyUserParam, PartyUserQuery } from "../../schemas-types";

export const all = async (
  db: DBNeonConnect,
  param: PartyUserParam,
  query: PartyUserQuery
) => {
  const { userId } = param;
  const data = await db
    .select()
    .from(tbl_party_user)
    .where(eq(tbl_party_user.user_id, userId))
    .limit(2);
  return data;
};
