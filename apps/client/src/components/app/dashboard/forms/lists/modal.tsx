import { useCallback } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";

import { ModuleDialog } from "~/components/app/shared-components/module-dialog";
import { CreateForm } from "./create-form";

export const CreateFormModal = () => {
  const router = useRouter();
  const search = useSearch({
    from: "/(app)/dashboard/forms/",
  });
  const { modal } = search;
  const open = modal === "create" ? true : false;

  const onOpenChange = useCallback(() => {
    router.navigate({ to: "." });
  }, [router]);

  return (
    <ModuleDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Form"
      description="Please continue and create your form."
    >
      <div className="max-w-xl">
        <CreateForm />
      </div>
    </ModuleDialog>
  );
};
