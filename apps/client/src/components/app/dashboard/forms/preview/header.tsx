import { ModuleInformation } from "~/components/app/shared-components/module-information";
import { HeaderActions } from "./header-actions";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const Header = () => {
  const { data } = useCollectionsFormsDetail();
  const [{ name, description }] = data;

  return (
    <div className="flex justify-between items-end w-full">
      <ModuleInformation mode="Preview" name={name} description={description} />
      <HeaderActions />
    </div>
  );
};
