import { useEffect } from "react";
import z from "zod";

import { useAppForm } from "~/components/custom-form";
import { useMutateData } from "~/services/hooks/use-forms-response";
import { usePreviewSchemaCore } from "./use-preview-schema-core";
import { BuilderFields, BuilderFormDBs } from "./schema-core";

export const usePreviewFormCore = (
  fields: BuilderFields[],
  formDBs: BuilderFormDBs[]
) => {
  const [{ name, description }] = formDBs;
  const { schema } = usePreviewSchemaCore(fields);

  const {
    mutateCreate: {
      mutateAsync: createAsync,
      isPending: isPendingUpdate,
      isSuccess: isSuccessUpdate,
    },
  } = useMutateData();

  const defaultValues: z.infer<typeof schema> = Object.fromEntries(
    fields.map((item) => [item.id, item.placeholder ?? ""])
  );

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      console.log({ name, description });
      const form_uuid = "a1e89556-3ba3-4fcc-a78e-12b0c8c9e3d1";
      await createAsync({
        param: { form_uuid },
        json: {
          form_uuid,
          json: value,
          jsonStr: JSON.stringify(value),
          other: {},
        },
      });
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
