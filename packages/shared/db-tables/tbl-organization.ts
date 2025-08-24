import { pgTable, serial, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { tbl_party } from "./tbl-party";
import { BaseStatus, BaseStatusDefault } from "../schemas-types/misc";

export const tbl_organization = pgTable("tbl_organization", {
  id: serial("id").notNull().unique(),
  uuid: uuid("uuid1").defaultRandom().primaryKey(),
  party_uuid: uuid("party_uuid")
    .references(() => tbl_party.uuid)
    .notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status")
    .$type<BaseStatus>()
    .default(BaseStatusDefault)
    .notNull(),
  author_party_uuid: uuid("author_party_uuid")
    .references(() => tbl_party.uuid)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
