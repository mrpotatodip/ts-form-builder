import { useParams } from "@tanstack/react-router";

import { PreviewViaDB } from "~/components/app/builder/form/preview-via-db";
import { Header } from "./header";
import { Preview } from "./preview";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const Main = () => {
  const { isLoading } = useCollectionsFormsDetail();

  if (isLoading) {
    return <div>Loading details...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex p-4 gap-10">
        <Header />
      </div>

      <div className="flex items-center justify-center h-screen">
        <Preview />
      </div>
    </div>
  );
};
