import { createFileRoute } from "@tanstack/react-router";

import { Index as FormsResponses } from "~/components/app/dashboard/forms/responses";

export const Route = createFileRoute(
  "/(app)/dashboard/forms/$form_uuid/responses/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormsResponses />;
}
