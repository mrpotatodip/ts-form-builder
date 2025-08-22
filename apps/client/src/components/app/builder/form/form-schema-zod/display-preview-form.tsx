import { ReactNode } from "react";

import { useDataQuery } from "../core/use-data-query-core";
import { PreviewFormCore } from "../core/preview-form-core";

export const DisplayPreviewForm = () => {
  const { fields } = useDataQuery();

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
