import { createSelectSchema } from "drizzle-zod";
import { formatError, z } from "zod";

import { DBTables } from "../db-tables";

const { tbl_form } = DBTables;

export const FormSchema = createSelectSchema(tbl_form);

export const FormCreateSchema = FormSchema.omit({
  id: true,
  uuid: true,
  createdAt: true,
});
export const FormUpdateSchema = FormSchema.omit({
  id: true,
  uuid: true,
  party_uuid: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "This field is required."),
  description: z.string().min(1, "This field is required."),
  json: z.string(),
});

export const FormListParamSchema = FormSchema.pick({
  party_uuid: true,
}).extend({
  party_uuid: z.string(),
});

export const FormDetailParamSchema = FormSchema.pick({
  party_uuid: true,
  uuid: true,
}).extend({
  party_uuid: z.string(),
  uuid: z.string(),
});

export const FormQuerySchema = FormSchema.pick({
  name: true,
  description: true,
}).extend({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type Form = typeof tbl_form.$inferSelect;
export type FormCreate = z.infer<typeof FormCreateSchema>;
export type FormUpdate = z.infer<typeof FormUpdateSchema>;
export type FormListParam = z.infer<typeof FormListParamSchema>;
export type FormDetailParam = z.infer<typeof FormDetailParamSchema>;
export type FormQuery = z.infer<typeof FormQuerySchema>;
