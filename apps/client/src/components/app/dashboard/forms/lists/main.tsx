import { useCollections as useCollectionsForms } from "~/services/collections/forms-collection";
import { useCollections as useCollectionsFormsResponse } from "~/services/collections/forms-response-collection";
import { ModuleInformation as HeaderLabels } from "~/components/app/shared-components/module-information";
import { HeaderActions } from "./header-actions";
import { Lists } from "./lists";

export const Main = () => {
  const { data: forms, isLoading: isLoadingForms } = useCollectionsForms();
  const { data: formsResponse, isLoading: isLoadingFormsResponse } =
    useCollectionsFormsResponse();

  return (
    <div className="w-full">
      <div className="flex p-4 gap-10">
        <div className="flex justify-between items-end w-full">
          <HeaderLabels
            mode="List"
            name={"Forms"}
            description={"Available forms"}
          />
          <HeaderActions />
        </div>
      </div>
      <div className="flex p-4 gap-10">
        <Lists data={forms} />
      </div>
    </div>
  );
};
