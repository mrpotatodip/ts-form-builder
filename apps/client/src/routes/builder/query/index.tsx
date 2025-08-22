import { createFileRoute } from "@tanstack/react-router";

import { QueryDisplay } from "~/components/app/builder/query/query-display";

export const Route = createFileRoute("/builder/query/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <QueryDisplay />;
}
