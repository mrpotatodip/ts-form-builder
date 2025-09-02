import { Link } from "@tanstack/react-router";

import { ModuleInformation } from "~/components/app/shared-components/module-information";

export const ListsItem = ({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col justify-between p-4 hover:bg-primary/10 w-[350px] h-[120px] bg-muted/40 rounded-md ">
      <div>
        <ModuleInformation name={name} description={description} />
        {/* <h1>{name}</h1>
        <p>{description}</p> */}
      </div>
      <div className="flex gap-2">
        <Link
          to="/dashboard/forms/$form_uuid/edit"
          params={{ form_uuid: id }}
          search={{ modal: "update" }}
          className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
        >
          Edit Info.
        </Link>

        <Link
          to="/dashboard/forms/$form_uuid/edit"
          params={{ form_uuid: id }}
          className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
        >
          Open Builder
        </Link>

        <Link
          to="/dashboard/forms/$form_uuid/preview"
          params={{ form_uuid: id }}
          className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
        >
          Preview
        </Link>
      </div>
    </div>
  );
};
