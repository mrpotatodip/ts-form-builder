import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { ZodObject, ZodRawShape } from "zod";

export const schemaZValidator = <TSchema extends ZodRawShape>(
  schema: ZodObject<TSchema>,
  target?: "param" | "query" | "json"
) => {
  const t = target ?? "json";
  return zValidator(t, schema, async (result, c) => {
    if (!result.success) {
      throw new HTTPException(500, {
        message: result.error.issues
          .map((issue) => `${issue.path} ${issue.message}`)
          .join(","),
      });
    }
  });
};
