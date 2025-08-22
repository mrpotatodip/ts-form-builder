import { pgTable, serial, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { tbl_party } from "./tbl-party";

export const tbl_party_user = pgTable("tbl_hodl_party_user", {
  id: serial("id").primaryKey(),
  party_uuid: uuid("party_uuid")
    .references(() => tbl_party.uuid)
    .notNull(),
  user_id: text("user_id").notNull(),
  stripe_customer_id: text("stripe_customer_id").default("").notNull(),
  email: text("email").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
