import { ReactNode } from "react";

import { useDataStore } from "../core/use-data-store";
import { PreviewFormCore } from "../core/preview-form-core";

export const DisplayPreviewForm = () => {
  const fields = useDataStore((state) => state.fields);

  if (!fields.length)
    return (
      <div>
        <p className="text-xs uppercase tracking-wider italic text-primary">
          Nothing to preview yet.
        </p>
      </div>
    );

  return <PreviewFormCore fields={fields} />;
};
