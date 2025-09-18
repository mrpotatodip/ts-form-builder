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

export type FormResponse = z.infer<typeof FormResponseSchema>;
export type FormResponseCreate = z.infer<typeof FormResponseCreateSchema>;
