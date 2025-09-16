import { createSelectSchema } from "drizzle-zod";
import { formatError, z } from "zod";

import { DBTables, DBTableVars } from "../db-tables";

const { tbl_form } = DBTables;
const { FormStatus, FormStatusEnum, FormAccess, FormAccessEnum } = DBTableVars;

export const FormStatusOptions = FormStatus.map((item) => item);
export const FormAccessOptions = FormAccess.map((item) => item);

export const FormSchema = createSelectSchema(tbl_form)
  .omit({
    id: true,
  })
  .extend({
    createdAt: z.string(),
    status: z.enum(FormStatusEnum),
    access: z.enum(FormAccessEnum),
    // json: z.object({}).catchall(z.any()),
  });

export const FormCreateSchema = FormSchema.extend({
  name: z.string().min(1, "This field is required."),
  description: z.string().min(1, "This field is required."),
  status: z.enum(FormStatusEnum),
  limit: z.number("This field must be a number."),
  access: z.enum(FormAccessEnum),
});

export const FormUpdateSchema = FormSchema.extend({
  name: z.string().min(1, "This field is required."),
  description: z.string().min(1, "This field is required."),
  status: z.enum(FormStatusEnum),
  limit: z.number("This field must be a number."),
  access: z.enum(FormAccessEnum),
});

export const FormListParamSchema = FormSchema.pick({
  party_uuid: true,
}).extend({
  party_uuid: z.string(),
});

export const FormDetailParamSchema = FormSchema.pick({
  uuid: true,
}).extend({
  uuid: z.string(),
});

export const FormQuerySchema = FormSchema.pick({
  name: true,
  description: true,
}).extend({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type Form = z.infer<typeof FormSchema>;
export type FormCreate = z.infer<typeof FormCreateSchema>;
export type FormUpdate = z.infer<typeof FormUpdateSchema>;
export type FormListParam = z.infer<typeof FormListParamSchema>;
export type FormDetailParam = z.infer<typeof FormDetailParamSchema>;
export type FormQuery = z.infer<typeof FormQuerySchema>;

export const FormInitValues = (party_uuid: string): FormCreate => {
  const randomString = (
    len: number = 4,
    chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  ) => {
    let result = "";
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const identifier = `FORM-${randomString()}`;

  return {
    uuid: crypto.randomUUID(),
    party_uuid,
    name: identifier,
    description: identifier,
    status: "draft",
    limit: 10,
    access: "0",
    json: { fields: [] },
    createdAt: new Date().toLocaleDateString(),
  };
};
