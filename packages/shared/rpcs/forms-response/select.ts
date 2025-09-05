import { SQL, eq, and, desc } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form_response } from "../../db-tables/tbl-form-response";
import type {
  FormResponseListParam,
  FormResponseDetailParam,
} from "../../schemas-types/tbl-form-response";

export const list = async (db: DBNeonConnect, param: FormResponseListParam) => {
  const { form_uuid } = param;

  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form_response.form_uuid, form_uuid));

  const data = await db
    .select()
    .from(tbl_form_response)
    .where(and(...conditions))
    .orderBy(desc(tbl_form_response.id));
  return data;
};

export const detail = async (
  db: DBNeonConnect,
  param: FormResponseDetailParam
) => {
  const { form_uuid, uuid } = param;

  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form_response.form_uuid, form_uuid));
  conditions.push(eq(tbl_form_response.uuid, uuid!));

  const data = await db
    .select()
    .from(tbl_form_response)
    .where(and(...conditions));

  return data;
};
