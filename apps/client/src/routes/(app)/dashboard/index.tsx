import { createFileRoute } from "@tanstack/react-router";

import { Dashboard } from "~/components/app/dashboard";

export const Route = createFileRoute("/(app)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
