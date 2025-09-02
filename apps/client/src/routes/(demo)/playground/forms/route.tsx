import { createFileRoute, Outlet } from "@tanstack/react-router";

import { validateSearch } from "~/components/app/builder/form/route-schema";

export const Route = createFileRoute("/(demo)/playground/forms")({
  component: RouteComponent,
  validateSearch,
});

function RouteComponent() {
  return <Outlet />;
}
