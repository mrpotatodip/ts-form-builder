import { createFileRoute } from "@tanstack/react-router";

import { Index as FormsEdit } from "~/components/app/dashboard/forms/edit";
import { validateRouteEditQuery } from "~/components/app/dashboard/forms/route-navs-options";

export const Route = createFileRoute("/(app)/dashboard/forms/$form_uuid/edit/")(
  {
    component: RouteComponent,
    validateSearch: validateRouteEditQuery,
  }
);

function RouteComponent() {
  return <FormsEdit />;
}
