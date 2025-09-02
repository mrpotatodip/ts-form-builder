import { useRouter } from "@tanstack/react-router";

import { FormUpdateSchema } from "shared";

import { useAppForm } from "~/components/custom-form";
import { useMutateData } from "~/services/hooks/use-forms";
import { useQuery_Detail_Forms } from "~/services/hooks/use-forms";

export const useEditForm = () => {
  const router = useRouter();
  const { result } = useQuery_Detail_Forms();
  const [{ party_uuid, uuid }] = result.data;
  const [{ name, description, json, ...otherValues }] = result.data;

  const {
    mutateUpdate: {
      mutateAsync: updateAsync,
      isPending: isPendingUpdate,
      isSuccess: isSuccessUpdate,
    },
  } = useMutateData();

  const form = useAppForm({
    defaultValues: {
      name,
      description,
      json: JSON.stringify(json),
    },
    validators: {
      onChange: FormUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      const param = { party_uuid, uuid };
      const json = { ...value };
      const data = { json, param };
      await updateAsync(data);
      router.navigate({ to: "." });
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
