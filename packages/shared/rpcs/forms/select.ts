import { SQL, eq, and, desc } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";
import type {
  FormListParam,
  FormDetailParam,
  FormQuery,
} from "../../schemas-types/tbl-form";

export const list = async (
  db: DBNeonConnect,
  param: FormListParam,
  query: FormQuery
) => {
  const { party_uuid } = param;
  const { name } = query;

  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form.party_uuid, party_uuid));
  if (name) conditions.push(eq(tbl_form.name, name));

  const data = await db
    .select()
    .from(tbl_form)
    .where(and(...conditions))
    .orderBy(desc(tbl_form.id));
  return data;
};

export const detail = async (db: DBNeonConnect, param: FormDetailParam) => {
  const { party_uuid, uuid } = param;

  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form.party_uuid, party_uuid));
  conditions.push(eq(tbl_form.uuid, uuid!));

  const data = await db
    .select()
    .from(tbl_form)
    .where(and(...conditions));

  return data;
};
