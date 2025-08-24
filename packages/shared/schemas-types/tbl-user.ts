import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { DBTables } from "../db-tables";
import { schemaZValidator } from "../utils/schema-validation";

const { tbl_user } = DBTables;

export const UserSchema = createSelectSchema(tbl_user);
export const UserParamSchema = z.object({
  userId: z.string(),
});
export const UserQuerySchema = z.object({
  _uuid: z.string().optional(),
});

export type User = typeof tbl_user.$inferSelect;
export type UserParam = z.infer<typeof UserParamSchema>;
export type UserQuery = z.infer<typeof UserQuerySchema>;
