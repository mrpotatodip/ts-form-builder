import { useCallback } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";

import { ModuleDialog } from "~/components/app/shared-components/module-dialog";
import { EditForm } from "./edit-form";

export const EditFormModal = () => {
  const router = useRouter();
  const search = useSearch({
    from: "/(app)/dashboard/forms/$form_uuid/edit/",
  });
  const { modal } = search;
  const open = modal === "update" ? true : false;

  const onOpenChange = useCallback(() => {
    router.navigate({ to: "." });
  }, [router]);

  return (
    <ModuleDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Info."
      description="Update form name and description."
    >
      <div className="max-w-xl">
        <EditForm />
      </div>
    </ModuleDialog>
  );
};
