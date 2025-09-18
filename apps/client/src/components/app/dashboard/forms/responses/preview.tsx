import { PreviewFormCore } from "~/components/app/builder/form/core/preview-form-core";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const Preview = () => {
  const { data } = useCollectionsFormsDetail();
  const [{ json }] = data;
  const fields = json?.fields || [];

  return (
    <div className="w-[450px] flex flex-col gap-2">
      <PreviewFormCore fields={fields} />
    </div>
  );
};
