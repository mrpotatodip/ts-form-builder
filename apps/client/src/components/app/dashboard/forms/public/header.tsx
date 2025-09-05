import { Form } from "shared";
import { useQuery_Detail_Forms } from "~/services/hooks/use-forms";
import { ModuleInformation } from "~/components/app/shared-components/module-information";
import { HeaderActions } from "./header-actions";

export const Header = () => {
  const { data } = useQuery_Detail_Forms();

  if (!data.length) return <div>empty!</div>;
  const [{ name, description }] = data;

  return (
    <div className="flex justify-between items-end w-full">
      <ModuleInformation mode="Preview" name={name} description={description} />
      <HeaderActions data={data} />
    </div>
  );
};
