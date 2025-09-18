import { useParams, useRouteContext } from "@tanstack/react-router";
import { PreviewFormCore } from "~/components/app/builder/form/core/preview-form-core";
import { useQuery_Public_Forms } from "~/services/hooks/use-forms-public";

export const Preview = () => {
  const { data } = useQuery_Public_Forms();

  if (!data.length) return <div>empty!</div>;

  const [{ uuid, party_uuid,json,  }] = data;

  return (
    <div className="w-[450px] flex flex-col gap-2">
      <PreviewFormCore fields={json["fields"]} form_uuid={uuid} party_uuid={party_uuid} />
    </div>
  );
};
