import { Preview } from "~/components/app/builder/form/preview";
import { Header } from "./header";

export const Main = () => {
  return (
    <div className="w-full">
      <div className="flex p-4 gap-10">
        <Header />
      </div>

      <Preview />
    </div>
  );
};
