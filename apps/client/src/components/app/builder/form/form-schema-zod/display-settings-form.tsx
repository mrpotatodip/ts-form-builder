import { useDataQuery } from "../core/use-data-query-core";
import { SettingsFormCore } from "../core/settings-form-core";

export const DisplaySettingsForm = () => {
  const { fields } = useDataQuery();

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
