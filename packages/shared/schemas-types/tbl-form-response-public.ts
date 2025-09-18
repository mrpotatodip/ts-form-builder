import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { DBTables } from "../db-tables";

const { tbl_form_response } = DBTables;

export const FormResponsePublicParamSchema = createSelectSchema(
  tbl_form_response,
)
  .pick({
    form_uuid: true,
  })
  .extend({
    form_uuid: z.string(),
  });

export const FormResponsePublicCreateSchema = createSelectSchema(
  tbl_form_response,
).omit({
  id: true,
  uuid: true,
  createdAt: true,
});

export type FormResponsePublicParam = z.infer<
  typeof FormResponsePublicParamSchema
>;
export type FormResponsePublicCreate = z.infer<
  typeof FormResponsePublicCreateSchema
>;
