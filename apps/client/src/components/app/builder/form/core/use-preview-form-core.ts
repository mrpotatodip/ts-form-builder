import { useEffect } from "react";
import z from "zod";

import { useAppForm } from "~/components/custom-form";
import { usePreviewSchemaCore } from "./use-preview-schema-core";
import { Builder } from "./schema-core";

export const usePreviewFormCore = (fields: Builder[]) => {
  const { schema } = usePreviewSchemaCore(fields);

  const defaultValues: z.infer<typeof schema> = Object.fromEntries(
    fields.map((item) => [item.id, item.placeholder ?? ""])
  );

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      console.log(fields);
    },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        // console.log(formApi.state.values, " formApi.state.values");
        // console.log(formApi.state.values);
      },
    },
  });

  useEffect(() => {
    form.reset();
    form.update;
    fields.map((field) => form.setFieldValue(field.name, ""));
  }, [form, fields, schema]);

  return {
    form,
  };
};
