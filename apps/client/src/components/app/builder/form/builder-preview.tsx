import { useDataStore } from "./core/use-data-store";
import { PreviewFormCore } from "./core/preview-form-core";

export const BuilderPreview = () => {
  const fields = useDataStore((state) => state.fields);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Preview</h2>
      <PreviewFormCore fields={fields} />
    </div>
  );
};
