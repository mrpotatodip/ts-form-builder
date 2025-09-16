import { Session } from "better-auth";
import { SQL, eq, and, desc } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_user } from "../../db-tables/tbl-user";
import { tbl_form } from "../../db-tables/tbl-form";
import type {
  FormListParam,
  FormDetailParam,
  FormQuery,
} from "../../schemas-types/tbl-form";

export const list = async (
  db: DBNeonConnect,
  param: FormListParam,
  query: FormQuery,
  session: Session,
) => {
  const { party_uuid } = param;
  const { name } = query;
  const { userId } = session;

  let user_conditions: SQL[] = [];
  user_conditions.push(eq(tbl_user.user_id, userId));
  const user = await db
    .select()
    .from(tbl_user)
    .where(and(...user_conditions));

  const [{ party_uuid: party_uuid_via_session }] = user;
  let forms_conditions: SQL[] = [];
  forms_conditions.push(eq(tbl_form.party_uuid, party_uuid_via_session));
  if (name) forms_conditions.push(eq(tbl_form.name, name));

  const forms = await db
    .select()
    .from(tbl_form)
    .where(and(...forms_conditions))
    .orderBy(desc(tbl_form.id));
  return forms;
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
