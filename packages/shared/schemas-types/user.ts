import { createSelectSchema } from "drizzle-zod";

import { DBTables } from "../db-tables";

const { user } = DBTables;

export const UserSchema = createSelectSchema(user);

export type User = typeof user.$inferSelect;
