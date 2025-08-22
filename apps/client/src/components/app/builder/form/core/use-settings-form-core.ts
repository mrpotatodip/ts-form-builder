import { useCallback, useEffect } from "react";

import { useAppForm } from "~/components/custom-form";
import { useDataMutation } from "./use-data-query-core";
import { Builder, BuilderFields, BuilderDefaults } from "./schema-core";

export const useSettingsFormCore = (fields: Builder[]) => {
  const { mutate, isError } = useDataMutation();

  const onChange = useCallback((updates: Builder[]) => {
    mutate({ data: updates, action: "update" });
  }, []);

  const form = useAppForm({
    defaultValues: {
      fields: [BuilderDefaults],
    },
    validators: {
      onChange: BuilderFields,
    },
    // onSubmit: ({ value }) => {
    //   mutate([value]);
    // },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        onChange(formApi.state.values.fields!);
        console.log(formApi.state.values.fields!);
      },
    },
  });

  useEffect(() => {
    form.clearFieldValues("fields");
    fields?.map((field) => form.pushFieldValue("fields", field));
  }, [form, fields]);

  return {
    form,
    isError,
  };
};
