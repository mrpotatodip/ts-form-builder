import { ListsItem } from "./lists-item";
import { useCollections as useCollectionsForms } from "~/services/collections/forms-collection";

export const Lists = () => {
  const { data, isLoading } = useCollectionsForms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((item) => (
        <ListsItem
          key={item.uuid}
          id={item.uuid}
          name={item.name}
          description={item.description}
          status={item.status}
        />
      ))}
    </div>
  );
};
