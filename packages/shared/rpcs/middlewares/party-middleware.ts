import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { SQL, eq, and } from "drizzle-orm";

import { DBNeonConnect } from "../../";

import { tbl_user } from "../../db-tables/tbl-user";
import { tbl_form } from "../../db-tables/tbl-form";

export const createPartyMiddleware = createMiddleware(async (c, next) => {
  try {
    const db = DBNeonConnect(c.env.DATABASE_URL);
    const { userId } = c.get("session");
    c.set("party", null);

    if (!userId) return c.json({ data: [], error: "Invalid session" }, 403);

    let conditions: SQL[] = [];
    conditions.push(eq(tbl_user.user_id, userId));
    const [{ party_uuid }] = await db
      .select()
      .from(tbl_user)
      .where(and(...conditions));

    if (!party_uuid) return c.json({ data: [], error: "Invalid session" }, 403);

    c.set("party_uuid", party_uuid);

    await next();
  } catch (error) {
    c.set("party_uuid", null);
    return c.json({ data: [], error: "Internal Server Error" }, 500);
  }
});
