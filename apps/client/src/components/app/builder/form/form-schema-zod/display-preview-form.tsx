import { BuilderFields } from "shared";

import { useDataStore } from "../core/use-data-store";
import { PreviewFormCore } from "../core/preview-form-core";

export const DisplayPreviewForm = ({
  fields,
  form_uuid,
}: {
  fields: BuilderFields[];
  form_uuid?: string;
}) => {
  if (!fields.length)
    return (
      <div>
        <p className="text-xs uppercase tracking-wider italic text-primary">
          Nothing to preview yet.
        </p>
      </div>
    );

  return <PreviewFormCore fields={fields} form_uuid={form_uuid} />;
};
