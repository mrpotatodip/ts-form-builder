import { createFileRoute } from "@tanstack/react-router";

import { QueryDisplay } from "~/components/app/builder/query/query-display";

export const Route = createFileRoute("/(demo)/playground/query/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <QueryDisplay />;
}
