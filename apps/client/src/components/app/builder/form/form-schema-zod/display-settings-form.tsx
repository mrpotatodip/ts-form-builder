import { BuilderFields } from "shared";

import { SettingsFormCore } from "../core/settings-form-core";

export const DisplaySettingsForm = ({
  fields,
}: {
  fields: BuilderFields[];
}) => {
  if (!fields.length)
    return (
      <div>
        <p className="text-xs uppercase tracking-wider italic text-primary">
          Nothing to preview yet.
        </p>
      </div>
    );

  return <SettingsFormCore fields={fields} />;
};
