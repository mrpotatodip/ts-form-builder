import {
  pgTable,
  serial,
  uuid,
  text,
  timestamp,
  json,
  integer,
} from "drizzle-orm/pg-core";
import { z } from "zod";

import { BuilderFieldsForms } from "../schemas-types/builder-core";
import { tbl_party } from "./tbl-party";

export const FormStatus = [
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
  { label: "Published", value: "published" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Expired", value: "expired" },
  { label: "Ended", value: "ended" },
] as const;
export type FormStatus = (typeof FormStatus)[number]["value"];
export const FormStatusDefault = FormStatus[0].value;
export const FormStatusEnum = FormStatus.map((s) => s.value) as [
  FormStatus,
  ...FormStatus[],
];

export const FormAccess = [
  { label: "Private", value: "0" },
  { label: "Public", value: "1" },
] as const;
export type FormAccess = (typeof FormAccess)[number]["value"];
export const FormAccessDefault = FormAccess[0].value;
export const FormAccessEnum = FormAccess.map((s) => s.value) as [
  FormAccess,
  ...FormAccess[],
];

export const tbl_form = pgTable("tbl_form", {
  id: serial("id").notNull().unique(),
  uuid: uuid("uuid1").defaultRandom().primaryKey(),
  party_uuid: uuid("party_uuid")
    .references(() => tbl_party.uuid)
    .notNull(),
  name: text("name").default("").notNull(),
  description: text("description").default("").notNull(),
  json: json("json").$type<BuilderFieldsForms>().notNull(),
  status: text("status")
    .$type<FormStatus>()
    .default(FormStatusDefault)
    .notNull(),
  limit: integer("limit").default(100).notNull(),
  access: text("access")
    .$type<FormAccess>()
    .default(FormAccessDefault)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
