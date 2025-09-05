import { useCallback } from "react";
import { Link } from "@tanstack/react-router";

import { Form } from "shared";

import { Button } from "~/components/ui/button";
import { BuilderFields } from "~/components/app/builder/form/core/schema-core";
import { useMutateData } from "~/services/hooks/use-forms";

export const HeaderActions = ({
  data,
  fields,
  isDirty,
}: {
  data: Form[];
  fields: BuilderFields[];
  isDirty: boolean;
}) => {
  const { mutateUpdate } = useMutateData();
  const { mutate: update, isPending: isPendingUpdate } = mutateUpdate;
  const [{ ...otherData }] = data;
  const { party_uuid, uuid } = otherData;

  const handleUpdate = useCallback(async () => {
    const param = { party_uuid, uuid };
    const json = { ...otherData, json: JSON.stringify({ fields }) };
    await update({ param, json });
  }, [fields, update, party_uuid, uuid, otherData]);

  return (
    <div className="flex items-center gap-6 pr-10">
      <Link
        to="/dashboard/forms"
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Back
      </Link>

      <Link
        to="/dashboard/forms/$form_uuid/preview"
        params={{ form_uuid: uuid }}
        className="text-xs text-primary uppercase tracking-widest px-2 py-1 hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        Preview
      </Link>

      {!isDirty ? (
        <h2 className="text-xs font-semibold text-green-300 uppercase tracking-widest">
          Saved
        </h2>
      ) : (
        <Button
          size={"sm"}
          className="uppercase tracking-widest text-xs cursor-pointer"
          onClick={handleUpdate}
          disabled={isPendingUpdate}
        >
          {isPendingUpdate ? "Saving ..." : "Save Changes"}
        </Button>
      )}
    </div>
  );
};
