import { DisplaySettingsForm } from "./form-schema-zod/display-settings-form";

export const BuilderSettings = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Settings</h2>
      <DisplaySettingsForm />
    </div>
  );
};
