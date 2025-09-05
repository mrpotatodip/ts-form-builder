import { useRouteContext } from "@tanstack/react-router";

import { FormCreateSchema, FormInitValues } from "shared";

import { useAppForm } from "~/components/custom-form";
import { useMutateData } from "~/services/hooks/use-forms";

export const useCreateForm = () => {
  const { userState } = useRouteContext({ from: "/(app)" });
  const [{ party_uuid }] = userState;
  const defaultValues = FormInitValues(party_uuid);

  const {
    mutateCreate: {
      mutateAsync: createForm,
      isPending: isPendingUpdate,
      isSuccess: isSuccessUpdate,
    },
  } = useMutateData();

  const form = useAppForm({
    defaultValues: {
      ...defaultValues,
    },
    validators: {
      onChange: FormCreateSchema,
    },
    onSubmit: async ({ value }) => {
      const param = { party_uuid };
      const json = { ...value };
      const data = { json, param };
      await createForm(data);
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
    isSuccessUpdate,
  };
};
