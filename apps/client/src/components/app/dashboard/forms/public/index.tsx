import { DataSuspense } from "~/components/app/dashboard/data-suspense";

import { Main } from "./main";

export const Index = () => {
  return (
    <DataSuspense>
      <Main />
    </DataSuspense>
  );
};
