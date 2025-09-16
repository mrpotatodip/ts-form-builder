import { useDataStore } from "./core/use-data-store";
import { SettingsFormCore } from "./core/settings-form-core";

export const BuilderSettings = () => {
  const fields = useDataStore((state) => state.fields);
  const updateBulkData = useDataStore((state) => state.updateBulkData);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Settings</h2>
      <SettingsFormCore fields={fields} handleUpdateFields={updateBulkData} />
    </div>
  );
};
