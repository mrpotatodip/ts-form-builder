import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";
import type { FormCreate } from "../../schemas-types/tbl-form";

export const create = async (
  db: DBNeonConnect,
  party_uuid: string,
  json: FormCreate,
) => {
  const { ...payload } = json;
  const values = { ...payload, party_uuid };
  const transactions = await db.transaction(async (tx) => {
    const insertValues = { ...values, createdAt: new Date(values.createdAt) };
    const form = await tx.insert(tbl_form).values(insertValues).returning();
    return {
      form,
    };
  });
  return [transactions.form[0]];
};
