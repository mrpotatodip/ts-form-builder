import { useCallback, useEffect } from "react";

import { useAppForm } from "~/components/custom-form";
import { useDataStore } from "../core/use-data-store";
import { Builder, BuilderFields, BuilderDefaults } from "./schema-core";

export const useSettingsFormCore = (fields: Builder[]) => {
  const updateBulkData = useDataStore((state) => state.updateBulkData);

  const onChange = useCallback((items: Builder[]) => {
    updateBulkData(items);
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
  };
};
