import { FormUpdateSchema, FormStatusOptions, FormAccessOptions } from "shared";

import { useAppForm } from "~/components/custom-form";
import { useMutateData } from "~/services/hooks/use-forms";
import { useQuery_Detail_Forms } from "~/services/hooks/use-forms";

export const useOtherInfosForm = () => {
  const { data } = useQuery_Detail_Forms();
  const statusOptions = FormStatusOptions;
  const accessOptions = FormAccessOptions;
  const [
    {
      party_uuid,
      uuid,
      name,
      description,
      status,
      limit,
      access,
      json,
      ...otherValues
    },
  ] = data;

  const {
    mutateUpdate: { mutateAsync: updateForms, isPending: isPendingUpdate },
  } = useMutateData();

  const form = useAppForm({
    defaultValues: {
      name,
      description,
      status,
      limit,
      access,
      json: JSON.stringify(json),
    },
    validators: {
      onChange: FormUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      const param = { party_uuid, uuid };
      const json = { ...value };
      const data = { json, param };
      await updateForms(data);
    },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        // console.log(formApi.state.values);
        // console.log(fields, " fields");
      },
      onSubmit: () => {
        // console.log("submitted ...");
        // if (isSuccessCreate) {
        //   console.log({ isSuccessCreate });
        //   const [{ uuid: form_uuid }] = dataCreate.data;
        //   router.navigate({
        //     to: "/dashboard/forms/edit/$form_uuid",
        //     params: { form_uuid },
        //   });
        // }
        // if (isSuccessUpdate) {
        //   router.navigate({
        //     to: ".",
        //   });
        // }
      },
    },
  });

  return {
    form,
    isPendingUpdate,
    statusOptions,
    accessOptions,
  };
};
