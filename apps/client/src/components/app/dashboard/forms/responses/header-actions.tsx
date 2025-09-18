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

      <Link
        to="/dashboard/forms/$form_uuid/edit"
        params={{ form_uuid }}
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Builder
      </Link>

      <Link
        to="/dashboard/forms/$form_uuid/preview"
        params={{ form_uuid }}
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Preview
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
    </div>
  );
};
