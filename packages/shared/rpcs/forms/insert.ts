import { eq } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";
import type { FormListParam, FormCreate } from "../../schemas-types/tbl-form";

export const create = async (
  db: DBNeonConnect,
  param: FormListParam,
  json: FormCreate
) => {
  const transactions = await db.transaction(async (tx) => {
    const form = await tx.insert(tbl_form).values(json).returning();
    return {
      form,
    };
  });
  return [transactions.form[0]];
};
