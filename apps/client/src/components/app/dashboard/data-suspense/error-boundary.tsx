import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

type ErrorBoundaryType = {
  children: ReactNode;
};

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div role="alert" className="text-red-600">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const ErrorBoundary = ({ children }: ErrorBoundaryType) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // optional: reset state or trigger refetch etc.
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
