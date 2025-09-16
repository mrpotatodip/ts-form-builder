import { BuilderFields } from "shared";

import { useDataStore } from "../core/use-data-store";
import { SettingsFormCore } from "../core/settings-form-core";

export const DisplaySettingsForm = () => {
  const fields = useDataStore((state) => state.fields);

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
