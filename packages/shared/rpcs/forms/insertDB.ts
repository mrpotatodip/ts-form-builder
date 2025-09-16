import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";
import type { FormCreate } from "../../schemas-types/tbl-form";

export const createDB = async (
  db: DBNeonConnect,
  party_uuid: string,
  json: FormCreate,
) => {
  const { createdAt, ...payload } = json;
  const values = { ...payload, party_uuid };
  const transactions = await db.transaction(async (tx) => {
    const form = await tx.insert(tbl_form).values(values).returning();
    return {
      form,
    };
  });
  return [transactions.form[0]];
};
