import { DBNeonConnect } from "../..";

import { user } from "../../better-auth/db-schema";

export const all = async (db: DBNeonConnect) => {
  const data = await db.select().from(user).limit(2);
  return data;
};
