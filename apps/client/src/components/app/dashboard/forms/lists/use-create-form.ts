import { useRouteContext, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { FormCreateSchema, FormInitValues } from "shared";

import { useAppForm } from "~/components/custom-form";
import { useCollectionsLiveQuery as useFormsCollectionsLiveQuery } from "~/services/collections/forms-collection";

export const useCreateForm = () => {
  const router = useRouter();
  const { userState } = useRouteContext({ from: "/(app)" });
  const { handleCreate } = useFormsCollectionsLiveQuery({});
  const [{ party_uuid }] = userState!;
  const initValues = FormInitValues(party_uuid);

  const form = useAppForm({
    defaultValues: initValues,
    validators: { onChange: FormCreateSchema },
    onSubmit: async ({ value }) => {
      handleCreate(value);
      router.navigate({ to: "." });
      toast.success("Form created successfully");
    },
  });

  return {
    form,
  };
};
