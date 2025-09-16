import {
  pgTable,
  serial,
  uuid,
  text,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

import { tbl_form } from "./tbl-form";

export const tbl_form_response = pgTable("tbl_form_response", {
  id: serial("id").notNull().unique(),
  uuid: uuid("uuid1").defaultRandom().primaryKey(),
  form_uuid: uuid("form_uuid")
    .references(() => tbl_form.uuid)
    .notNull(),
  json: json("json").notNull(),
  json_str: text("json_str").notNull(),
  other: json("other").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
