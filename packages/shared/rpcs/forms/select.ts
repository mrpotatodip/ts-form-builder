import { SQL, eq, and, desc } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form } from "../../db-tables/tbl-form";

export const list = async (db: DBNeonConnect, party_uuid: string) => {
  let forms_conditions: SQL[] = [];
  forms_conditions.push(eq(tbl_form.party_uuid, party_uuid));

  const forms = await db
    .select()
    .from(tbl_form)
    .where(and(...forms_conditions))
    .orderBy(desc(tbl_form.id));

  return forms;
};
