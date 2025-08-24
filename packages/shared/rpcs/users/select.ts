import { eq } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_user } from "../../db-tables/tbl-user";
import type { UserParam, UserQuery } from "../../schemas-types";

export const all = async (
  db: DBNeonConnect,
  param: UserParam,
  query: UserQuery
) => {
  const { userId } = param;
  const data = await db
    .select()
    .from(tbl_user)
    .where(eq(tbl_user.user_id, userId))
    .limit(2);
  return data;
};
