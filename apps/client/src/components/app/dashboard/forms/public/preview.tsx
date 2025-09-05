import { PreviewFormCore } from "~/components/app/builder/form/core/preview-form-core";
import { useQuery_Public_Forms } from "~/services/hooks/use-forms-public";

export const Preview = () => {
  const { data } = useQuery_Public_Forms();

  if (!data.length) return <div>empty!</div>;
  const [{ json }] = data;

  return (
    <div className="w-[450px] flex flex-col gap-2">
      <PreviewFormCore fields={json["fields"]} formDBs={data} />
    </div>
  );
};
