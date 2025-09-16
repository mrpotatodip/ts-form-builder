import { useLiveQuery } from "@tanstack/react-db";
import { useRouteContext } from "@tanstack/react-router";
import { Header } from "./header";
import { Lists } from "./lists";

export const Main = () => {
  return (
    <div>
      <div className="flex p-4 gap-10">
        <Header />
      </div>
      <div className="flex p-4 gap-10">
        <Lists />
      </div>
    </div>
  );
};
