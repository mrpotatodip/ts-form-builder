import { useEffect } from "react";
import z from "zod";

import { useAppForm } from "~/components/custom-form";
import { useMutateData } from "~/services/hooks/use-forms-response-public";
import { usePreviewSchemaCore } from "./use-preview-schema-core";
import { BuilderFields, BuilderFormDBs } from "./schema-core";

export const usePreviewFormCore = (
  fields: BuilderFields[],
  form_uuid?: string,
  party_uuid?: string,
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
    fields.map((item) => [item.id, item.placeholder ?? ""]),
  );

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      // database
      if (form_uuid && party_uuid) {
        await createFormResponse({
          param: { form_uuid },
          json: {
            puuid: party_uuid,
            form_uuid,
            json: value,
            json_str: JSON.stringify(value),
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
