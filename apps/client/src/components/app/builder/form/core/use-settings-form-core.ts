import { useCallback, useEffect } from "react";

import { useAppForm } from "~/components/custom-form";
import { useDataStore } from "../core/use-data-store";
import {
  BuilderFields,
  BuilderFieldsForms,
  BuilderFieldsDefaults,
} from "./schema-core";

export const useSettingsFormCore = (fields: BuilderFields[]) => {
  const updateBulkData = useDataStore((state) => state.updateBulkData);

  const onChange = useCallback((items: BuilderFields[]) => {
    updateBulkData(items);
  }, []);

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
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        onChange(formApi.state.values.fields!);
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
