import { DataSuspense } from "~/components/app/dashboard/data-suspense";

import { Main } from "./main";
import { CreateFormModal } from "./modal";

export const Index = () => {
  return (
    <DataSuspense>
      <Main />
      <CreateFormModal />
    </DataSuspense>
  );
};
