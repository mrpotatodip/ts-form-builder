import { SQL, eq, and, desc } from "drizzle-orm";

import type { DBNeonConnect } from "../..";

import { tbl_form_response } from "../../db-tables/tbl-form-response";

export const list = async (db: DBNeonConnect, party_uuid: string) => {
  let conditions: SQL[] = [];
  conditions.push(eq(tbl_form_response.puuid, party_uuid));

  const data = await db
    .select()
    .from(tbl_form_response)
    .where(and(...conditions))
    .orderBy(desc(tbl_form_response.id));
  return data;
};
