import { createFileRoute } from "@tanstack/react-router";

import { Preview } from "~/components/app/builder/form/preview";

export const Route = createFileRoute("/(demo)/playground/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Preview />;
}
