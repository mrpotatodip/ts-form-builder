import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { DBTables } from "../db-tables";
import { schemaZValidator } from "../utils/schema-validation";

const { tbl_party_user } = DBTables;

export const PartyUserSchema = createSelectSchema(tbl_party_user);
export const PartyUserParamSchema = z.object({
  userId: z.string(),
});
export const PartyUserQuerySchema = z.object({
  party_uuid: z.string().optional(),
});

export type PartyUser = typeof tbl_party_user.$inferSelect;
export type PartyUserParam = z.infer<typeof PartyUserParamSchema>;
export type PartyUserQuery = z.infer<typeof PartyUserQuerySchema>;
