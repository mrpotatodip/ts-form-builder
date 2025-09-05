import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { DBTables } from "../db-tables";

const { tbl_form_response } = DBTables;

export const FormResponseSchema = createSelectSchema(tbl_form_response).extend({
  createdAt: z.string(),
});

export const FormResponseCreateSchema = FormResponseSchema.omit({
  id: true,
  uuid: true,
  createdAt: true,
});

export const FormResponseListParamSchema = FormResponseSchema.pick({
  form_uuid: true,
}).extend({
  form_uuid: z.string(),
});

export const FormResponseDetailParamSchema = FormResponseSchema.pick({
  form_uuid: true,
  uuid: true,
}).extend({
  form_uuid: z.string(),
  uuid: z.string(),
});

export type FormResponse = z.infer<typeof FormResponseSchema>;
export type FormResponseCreate = z.infer<typeof FormResponseCreateSchema>;
export type FormResponseListParam = z.infer<typeof FormResponseListParamSchema>;
export type FormResponseDetailParam = z.infer<
  typeof FormResponseDetailParamSchema
>;
