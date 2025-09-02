import { ReactNode, Suspense as ReactSuspense } from "react";

import { ErrorBoundary } from "./error-boundary";
import { DataSuspenseLoader } from "./suspense-loader";

type SuspenseType = {
  children: ReactNode;
};

export const DataSuspense = ({ children }: SuspenseType) => {
  return (
    <ErrorBoundary>
      <ReactSuspense fallback={<DataSuspenseLoader />}>
        {children}
      </ReactSuspense>
    </ErrorBoundary>
  );
};
