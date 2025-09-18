import { Link } from "@tanstack/react-router";

import { Form } from "shared";
import { ModuleInformation } from "~/components/app/shared-components/module-information";

export const ListsItem = ({ data }: { data: Form }) => {
  const { uuid: form_uuid, name, description, status } = data;

  return (
    <div className="flex flex-col justify-between p-4 hover:bg-primary/10 w-[400px] h-[150px] bg-muted/40 rounded-md ">
      <div>
        <ModuleInformation
          name={name}
          description={description}
          mode={status}
        />
      </div>
      <div className="flex gap-2">
        <Link
          to="/dashboard/forms/$form_uuid/edit"
          params={{ form_uuid }}
          className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
        >
          Open Builder
        </Link>

        <Link
          to="/dashboard/forms/$form_uuid/preview"
          params={{ form_uuid }}
          className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
        >
          Preview
        </Link>
      </div>
    </div>
  );
};

export const Lists = ({ data }: { data: Form[] }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((item) => (
        <ListsItem data={item} />
      ))}
    </div>
  );
};
