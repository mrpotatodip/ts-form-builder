import { z } from "zod";

import { BuilderFields } from "./schema-core";

export const usePreviewSchemaCore = (fields: BuilderFields[]) => {
  let shape: Record<string, z.ZodTypeAny> = {};

  for (const [key, field] of Object.entries(fields)) {
    let zodType: z.ZodTypeAny;

    switch (field.type) {
      case "checkbox":
        let boolType = z.coerce.boolean();
        zodType = boolType;
        break;
      case "number":
        let numType = z.coerce.number();
        if (field.min)
          numType = field.minError
            ? numType.min(Number(field.min), { error: field.minError })
            : numType.min(Number(field.min));
        if (field.max)
          numType = field.maxError
            ? numType.min(Number(field.max), { error: field.maxError })
            : numType.min(Number(field.max));
        zodType = numType;
        break;
      default:
        let strType = z.coerce.string();
        let isClean =
          isNaN(Number(field.minLength)) ||
          (field.minLength !== undefined &&
            field.maxLength !== undefined &&
            Number(field.minLength) > Number(field.maxLength))
            ? false
            : true;

        if (field.minLength && isClean) {
          strType = field.minLengthError
            ? strType.min(Number(field.minLength), {
                error: field.minLengthError,
              })
            : strType.min(Number(field.minLength));
        }

        if (field.maxLength && isClean) {
          strType = field.maxLengthError
            ? strType.max(Number(field.maxLength), {
                error: field.maxLengthError,
              })
            : strType.max(Number(field.maxLength));
        }

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
