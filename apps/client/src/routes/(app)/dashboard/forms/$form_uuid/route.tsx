import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/forms/$form_uuid")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
