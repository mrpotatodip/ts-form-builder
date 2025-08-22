import { useEffect } from "react";

import { useAppForm } from "~/components/custom-form";
import { usePreviewSchemaCore } from "./use-preview-schema-core";
import { Builder } from "./schema-core";

export const usePreviewFormCore = (fields: Builder[]) => {
  const { schema } = usePreviewSchemaCore(fields);

  const form = useAppForm({
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
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
    fields.map((field) => form.setFieldValue(field.name, ""));
    form.update;
  }, [form, fields, schema]);

  return {
    form,
  };
};
