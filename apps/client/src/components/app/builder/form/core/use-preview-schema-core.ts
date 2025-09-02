import { z } from "zod";

import { Builder } from "./schema-core";

export const usePreviewSchemaCore = (fields: Builder[]) => {
  let shape: Record<string, z.ZodTypeAny> = {};

  for (const [key, field] of Object.entries(fields)) {
    let zodType: z.ZodTypeAny;

    switch (field.type) {
      case "checkbox":
        let boolType = z.boolean();
        zodType = boolType;
        break;
      case "number":
        let numType = z.coerce.number();
        if (field.min)
          numType = field.minError
            ? numType.min(field.min, { error: field.minError })
            : numType.min(field.min);
        if (field.max)
          numType = field.maxError
            ? numType.min(field.max, { error: field.maxError })
            : numType.min(field.max);
        zodType = numType;
        break;
      default:
        let strType = z.string();
        if (field.minLength)
          strType = field.minLengthError
            ? strType.min(field.minLength, { error: field.minLengthError })
            : strType.min(field.minLength);
        if (field.maxLength)
          strType = field.maxLengthError
            ? strType.max(field.maxLength, { error: field.maxLengthError })
            : strType.max(field.maxLength);
        zodType = strType;
        break;
    }

    if (!field.required) {
      zodType = zodType.optional();
    }

    shape[field.id] = zodType;
  }

  const schema = z.object(shape);

  return {
    schema,
  };
};
