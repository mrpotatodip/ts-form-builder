import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { DBTables } from "../db-tables";

const { tbl_form } = DBTables;

export const FormPublicSchema = createSelectSchema(tbl_form).extend({
  createdAt: z.string(),
});

export const FormPublicParamSchema = FormPublicSchema.pick({
  uuid: true,
}).extend({
  uuid: z.string(),
});

export type FormPublic = z.infer<typeof FormPublicSchema>;
export type FormPublicParam = z.infer<typeof FormPublicParamSchema>;
