import { Link } from "@tanstack/react-router";

import { useQuery_All_Forms } from "~/services/hooks/use-forms";
import { ListsItem } from "./lists-item";

export const Lists = () => {
  const { data } = useQuery_All_Forms();

  if (!data || !data.length) return <div>empty!</div>;

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((item) => (
        <ListsItem
          key={item.id}
          id={item.uuid}
          name={item.name}
          description={item.description}
        />
      ))}
    </div>
  );
};
