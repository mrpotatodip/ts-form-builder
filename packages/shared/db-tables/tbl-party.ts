import { pgTable, serial, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const PartyTypeOptions = [
  "user",
  "customer",
  "superadmin",
  "bot",
  "company",
  "person",
  "organization",
] as const;
export type PartyTypOptions = (typeof PartyTypeOptions)[number];
const DefaultPartyType: PartyTypOptions = "user";

export const tbl_party = pgTable("tbl_party", {
  id: serial("id").notNull().unique(),
  uuid: uuid("uuid1").defaultRandom().primaryKey(),
  type: text("type")
    .$type<PartyTypOptions>()
    .default(DefaultPartyType)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
