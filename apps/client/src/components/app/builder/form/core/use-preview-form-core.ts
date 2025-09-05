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
  const { schema } = usePreviewSchemaCore(fields);

  const {
    mutateCreate: {
      mutateAsync: createFormResponse,
      isPending: isPendingCreate,
      isSuccess: isSuccessCreate,
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
      // enable submit action when
      // form is generated via database
      if (formDBs.length) {
        const [{ uuid: form_uuid }] = formDBs;
        await createFormResponse({
          param: { form_uuid },
          json: {
            form_uuid,
            json: value,
            jsonStr: JSON.stringify(value),
            other: {},
          },
        });
      } else {
        // playground
        console.log(value);
      }
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
    isPendingCreate,
    isSuccessCreate,
  };
};
