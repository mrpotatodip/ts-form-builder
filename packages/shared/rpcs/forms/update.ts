import { SQL, and, eq } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";
import type { FormDetailParam, FormUpdate } from "../../schemas-types/tbl-form";

export const update = async (
  db: DBNeonConnect,
  party_uuid: string,
  param: FormDetailParam,
  json: FormUpdate,
) => {
  const { uuid } = param;

  const { ...payload } = json;
  const values = { ...payload };
  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form.party_uuid, party_uuid));
  conditions.push(eq(tbl_form.uuid, uuid));

  const transactions = await db.transaction(async (tx) => {
    const updateValues = { ...values, createdAt: new Date(values.createdAt) };
    const form = await tx
      .update(tbl_form)
      .set(updateValues)
      .where(and(...conditions))
      .returning();
    return {
      form,
    };
  });
  return [transactions.form[0]];
};
