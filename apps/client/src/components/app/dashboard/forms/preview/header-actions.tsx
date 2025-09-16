import { Link } from "@tanstack/react-router";

import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const HeaderActions = () => {
  const { form_uuid, data } = useCollectionsFormsDetail();
  const [{ status, access }] = data;
  const isPublished = status === "published" || false;
  const isPublic = access === "1" || false;

  return (
    <div className="flex items-center gap-4 pr-10">
      <Link
        to="/dashboard/forms"
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Back
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
