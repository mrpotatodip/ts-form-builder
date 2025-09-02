import { Link } from "@tanstack/react-router";

import { Form } from "shared";

export const HeaderActions = ({ data }: { data: Form[] }) => {
  const [{ json, ...fieldsDBOther }] = data;
  const { uuid } = fieldsDBOther;

  return (
    <div className="flex items-center gap-6">
      <Link
        to="/dashboard/forms"
        className="text-xs text-primary uppercase tracking-widest px-2 py-1"
      >
        Back
      </Link>

      <Link
        to="/dashboard/forms/$form_uuid/edit"
        params={{ form_uuid: uuid }}
        search={{ modal: "update" }}
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Edit Info.
      </Link>

      <Link
        to="/dashboard/forms/$form_uuid/edit"
        params={{ form_uuid: uuid }}
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Open Builder
      </Link>
    </div>
  );
};
