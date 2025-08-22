import { createSelectSchema } from "drizzle-zod";

import { DBTables } from "../db-tables";

const { session } = DBTables;

export const SessionSchema = createSelectSchema(session);

export type Session = typeof session.$inferSelect;
