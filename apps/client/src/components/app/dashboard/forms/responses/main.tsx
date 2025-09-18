import { useParams } from "@tanstack/react-router";

import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";
import { useCollectionsDetail as useCollectionsFormsResponseDetail } from "~/services/collections/forms-response-collection";
import { ModuleInformation as HeaderLabels } from "~/components/app/shared-components/module-information";
import { HeaderActions } from "./header-actions";
import { TablePreview } from "./table-preview";

export const Main = () => {
  const { data: forms, isLoading: isLoadingForms } =
    useCollectionsFormsDetail();
  const { data: formsResponse, isLoading: isLoadingFormsResponse } =
    useCollectionsFormsResponseDetail();

  if (isLoadingForms || isLoadingFormsResponse) return <></>;
  const [{ name, description }] = forms;
  const responsesCount = formsResponse.length;

  return (
    <div className="w-full">
      <div className="flex p-4 gap-10">
        <div className="flex justify-between items-end w-full">
          <HeaderLabels
            mode=""
            name={name}
            description={description}
          />
          <HeaderActions data={forms} responses={formsResponse} />
        </div>
      </div>

      <div className="w-full">
        <TablePreview data={formsResponse} />
      </div>
    </div>
  );
};
