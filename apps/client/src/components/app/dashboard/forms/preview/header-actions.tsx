import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";

import { Form, FormResponse } from "shared";

export const HeaderActions = ({
  data,
  responses,
}: {
  data: Form[];
  responses: FormResponse[];
}) => {
  const [{ uuid: form_uuid, status, access, limit }] = data;
  const isPublished = status === "published" || false;
  const isPublic = access === "1" || false;
  const responsesCount = responses.length;

  return (
    <div className="flex items-center gap-4 pr-10">
      <Link
        to="/dashboard/forms"
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Dashboard
      </Link>

      <div className="flex items-center group">
        <Link
          to="/dashboard/forms/$form_uuid/responses"
          params={{ form_uuid }}
          className="text-xs text-primary uppercase tracking-widest px-2 py-1 group-hover:text-primary/80 group-hover:underline group-hover:underline-offset-4"
        >
          Responses
        </Link>
        <Badge className="" variant="default">
          {responsesCount}/{limit}
        </Badge>
      </div>

      <Link
        to="/dashboard/forms/$form_uuid/edit"
        params={{ form_uuid }}
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Builder
      </Link>

      <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
        {isPublic ? "Public" : "Private"}
      </h2>

      {isPublished ? (
        <Link
          to="/$form_uuid"
          params={{ form_uuid }}
          className="text-xs text-primary font-semibold uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
          target="_blank"
        >
          LIVE URL
        </Link>
      ) : null}

      {/* {!isDirty ? (
        <h2 className="text-xs font-semibold text-green-300 uppercase tracking-widest">
          Saved
        </h2>
      ) : (
        <Button
          size={"sm"}
          className="uppercase tracking-widest text-xs cursor-pointer"
          onClick={handleUpdateAction}
        >
          Save Changes
        </Button>

      )} */}
    </div>
  );
};
