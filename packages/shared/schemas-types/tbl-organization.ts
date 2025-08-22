import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { DBTables } from "../db-tables";
import { BaseStatusEnum } from "../schemas-types/misc";

const { tbl_organization } = DBTables;

export const OrganizationSchema = createSelectSchema(tbl_organization).extend({
  status: z.enum(BaseStatusEnum),
  createdAt: z.string(),
});

export const OrganizationJsonSchema = z.object({
  party_uuid: z.string(),
  name: z.string(),
  status: z.string(),
  author_party_uuid: z.string(),
});
export const OrganizationParamSchema = z.object({
  author_party_uuid: z.string(),
});
export const OrganizationQuerySchema = z.object({
  party_uuid: z.string().optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
export type OrganizationParam = z.infer<typeof OrganizationParamSchema>;
export type OrganizationQuery = z.infer<typeof OrganizationQuerySchema>;
export type OrganizationJson = z.infer<typeof OrganizationJsonSchema>;
