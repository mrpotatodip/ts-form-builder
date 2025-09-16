import { useEffect } from "react";

import { useAppForm } from "~/components/custom-form";
import {
  BuilderFields,
  BuilderFieldsForms,
  BuilderFieldsDefaults,
} from "./schema-core";

export const useSettingsFormCore = (fields: BuilderFields[]) => {
  const form = useAppForm({
    defaultValues: {
      fields: [BuilderFieldsDefaults],
    },
    validators: {
      onChange: BuilderFieldsForms,
    },
    // onSubmit: ({ value }) => {
    //   mutate([value]);
    // },
  });

  useEffect(() => {
    form.clearFieldValues("fields");
    fields?.map((field) => form.pushFieldValue("fields", field));
  }, [form, fields]);

  return {
    form,
  };
};
