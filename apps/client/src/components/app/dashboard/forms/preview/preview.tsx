import { Form } from "shared";

import { PreviewFormCore } from "~/components/app/builder/form/core/preview-form-core";

export const Preview = ({ data }: { data: Form[] }) => {
  const [{ json }] = data;
  const fields = json.fields || [];

  return (
    <div className="w-[450px] flex flex-col gap-2">
      <PreviewFormCore fields={fields} />
    </div>
  );
};
