import { eq } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form_response } from "../../db-tables/tbl-form-response";
import type {
  FormResponseListParam,
  FormResponseCreate,
} from "../../schemas-types/tbl-form-response";

export const create = async (
  db: DBNeonConnect,
  param: FormResponseListParam,
  json: FormResponseCreate
) => {
  const transactions = await db.transaction(async (tx) => {
    const form = await tx.insert(tbl_form_response).values(json).returning();
    return {
      form,
    };
  });
  return [transactions.form[0]];
};
