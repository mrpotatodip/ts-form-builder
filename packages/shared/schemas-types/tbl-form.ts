import { createSelectSchema, createInsertSchema } from "drizzle-zod";
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
    uuid: z.string(),
    name: z.string(),
    description: z.string(),
    limit: z.number(),
    status: z.enum(FormStatusEnum),
    access: z.enum(FormAccessEnum),
    createdAt: z.string(),
  });

export const FormCreateSchema = createInsertSchema(tbl_form)
  .omit({
    id: true,
  })
  .extend({
    uuid: z.string(),
    name: z.string().min(1, "This field is required."),
    description: z.string().min(1, "This field is required."),
    limit: z.number("This field must be a number."),
    status: z.enum(FormStatusEnum),
    access: z.enum(FormAccessEnum),
    createdAt: z.string(),
  });

export const FormUpdateSchema = FormCreateSchema.extend({
  uuid: z.string(),
  name: z.string().min(1, "This field is required."),
  description: z.string().min(1, "This field is required."),
  limit: z.number("This field must be a number."),
  status: z.enum(FormStatusEnum),
  access: z.enum(FormAccessEnum),
  createdAt: z.string(),
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
    createdAt: new Date().toDateString(),
  };
};
