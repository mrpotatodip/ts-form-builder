import { createFileRoute } from "@tanstack/react-router";

import { Index as FormsPreview } from "~/components/app/dashboard/forms/preview";

export const Route = createFileRoute(
  "/(app)/dashboard/forms/$form_uuid/preview/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormsPreview />;
}
