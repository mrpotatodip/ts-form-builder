import { DisplayPreviewForm } from "./form-schema-zod/display-preview-form";

export const BuilderPreview = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Preview</h2>
      <DisplayPreviewForm />
    </div>
  );
};
