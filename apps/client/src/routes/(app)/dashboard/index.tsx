import { createFileRoute } from "@tanstack/react-router";

import { DashboardTest } from "~/components/app/dashboard/test";

export const Route = createFileRoute("/(app)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DashboardTest />
    </div>
  );
}
