import { DataSuspense } from "~/components/app/dashboard/data-suspense";

import { Main } from "./main";
import { EditFormModal } from "./modal";

export const Index = () => {
  return (
    <DataSuspense>
      <Main />

      {/* modals */}
      <EditFormModal />
    </DataSuspense>
  );
};
