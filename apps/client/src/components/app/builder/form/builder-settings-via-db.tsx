import { SettingsFormCore } from "./core/settings-form-core";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const BuilderSettingsViaDB = () => {
  const { data, handleUpdateFields } = useCollectionsFormsDetail();
  const [{ json }] = data;
  const fields = json?.fields || [];

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Settings</h2>
      <SettingsFormCore
        fields={fields}
        handleUpdateFields={handleUpdateFields}
      />
    </div>
  );
};
