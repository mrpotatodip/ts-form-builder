import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";

import { FormUpdateSchema, FormStatusOptions, FormAccessOptions } from "shared";

import { useAppForm } from "~/components/custom-form";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const useOtherInfosForm = () => {
  const { data, handleUpdate } = useCollectionsFormsDetail();
  const [{ ...initValues }] = data;
  const statusOptions = FormStatusOptions;
  const accessOptions = FormAccessOptions;

  let timeout: ReturnType<typeof setTimeout>;
  const form = useAppForm({
    defaultValues: initValues,
    validators: {
      onChange: FormUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      handleUpdate(value);
    },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          handleUpdate(formApi.state.values);
          toast.success("Details are saved successfully");
        }, 2000);
      },
    },
  });

  return {
    form,
    statusOptions,
    accessOptions,
  };
};
