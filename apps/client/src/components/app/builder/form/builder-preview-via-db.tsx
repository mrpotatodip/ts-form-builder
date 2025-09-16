import { useParams } from "@tanstack/react-router";

import { PreviewFormCore } from "./core/preview-form-core";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const BuilderPreviewViaDB = () => {
  const { form_uuid, data } = useCollectionsFormsDetail();
  const [{ json }] = data;
  const fields = json?.fields || [];

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Preview</h2>
      <PreviewFormCore fields={fields} form_uuid={form_uuid} />
    </div>
  );
};
