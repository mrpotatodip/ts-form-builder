import { Preview } from "~/components/app/builder/form/preview-with-dbs";
import { Header } from "./header";
import { OtherInfos } from "./other-infos";

export const Main = () => {
  return (
    <div className="w-full">
      <div className="flex p-4 gap-10">
        <Header />
      </div>

      <Preview>
        <OtherInfos />
      </Preview>
    </div>
  );
};
