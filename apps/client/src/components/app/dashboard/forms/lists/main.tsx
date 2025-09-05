import { useLiveQuery } from "@tanstack/react-db";
import { useRouteContext } from "@tanstack/react-router";
import { Header } from "./header";
import { Lists } from "./lists";

import { formsCollection } from "~/services/collections/forms-collection";

export const Main = () => {
  const { data: forms } = useLiveQuery(
    (q) => q.from({ forms: formsCollection })
    // .where(({ todo }) => eq(todo.completed, false))
    // .orderBy(({ todo }) => todo.createdAt, "desc")
  );
  console.log(forms, " collectionX");

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
