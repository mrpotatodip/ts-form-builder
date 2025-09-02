import { useRouteContext, useRouter } from "@tanstack/react-router";

import { FormUpdateSchema, FormCreate } from "shared";

import { useAppForm } from "~/components/custom-form";
import { useMutateData } from "~/services/hooks/use-forms";
import { useQuery_Detail_Forms } from "~/services/hooks/use-forms";

export const useCreateForm = () => {
  const router = useRouter();
  const { userState } = useRouteContext({ from: "/(app)" });
  const [{ party_uuid }] = userState;

  const {
    mutateCreate: {
      mutateAsync: createAsync,
      isPending: isPendingUpdate,
      isSuccess: isSuccessUpdate,
    },
  } = useMutateData();

  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
      json: JSON.stringify({ fields: [] }),
    },
    validators: {
      onChange: FormUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      const param = { party_uuid };
      const json = { party_uuid, ...value };
      const data = { json, param };
      await createAsync(data);
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
