import { createFileRoute } from "@tanstack/react-router";

import { Index as FormsPreview } from "~/components/app/dashboard/forms/public";

export const Route = createFileRoute("/(public)/$form_uuid/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormsPreview />;
}
