import {
  pgTable,
  serial,
  uuid,
  text,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

import { tbl_party } from "./tbl-party";

export const tbl_form = pgTable("tbl_form", {
  id: serial("id").notNull().unique(),
  uuid: uuid("uuid1").defaultRandom().primaryKey(),
  party_uuid: uuid("party_uuid")
    .references(() => tbl_party.uuid)
    .notNull(),
  name: text("name").default("").notNull(),
  description: text("description").default("").notNull(),
  json: json("json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
