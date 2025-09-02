import { ModuleInformation } from "~/components/app/shared-components/module-information";
import { HeaderActions } from "./header-actions";

export const Header = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <ModuleInformation
        mode="List"
        name={"Forms"}
        description={"Available forms"}
      />
      <HeaderActions />
    </div>
  );
};
