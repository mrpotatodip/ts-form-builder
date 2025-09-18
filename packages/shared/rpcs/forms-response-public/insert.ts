import { SQL, eq, and, desc } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form_response } from "../../db-tables/tbl-form-response";
import type { FormResponsePublicCreate } from "../../schemas-types/tbl-form-response-public";

export const create = async (
  db: DBNeonConnect,
  json: FormResponsePublicCreate,
) => {
  const { ...payload } = json;
  const transactions = await db.transaction(async (tx) => {
    const insertValues = { ...payload };
    const form = await tx
      .insert(tbl_form_response)
      .values(insertValues)
      .returning();
    return {
      form,
    };
  });

  return [transactions.form[0]];
};
