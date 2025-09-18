import { SQL, eq, and } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";
import type { FormPublicParam } from "../../schemas-types/tbl-form-public";

export const detail = async (db: DBNeonConnect, param: FormPublicParam) => {
  const { uuid } = param;

  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form.uuid, uuid));

  const data = await db
    .select()
    .from(tbl_form)
    .where(and(...conditions));

  return data;
};
