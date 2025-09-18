import { createFileRoute } from "@tanstack/react-router";

import { Index as FormsLists } from "~/components/app/dashboard/forms/lists";
import { RouteListsQuerySchema } from "~/components/app/dashboard/forms/route-navs-options";
import { collections as queryFormsCollection } from "~/services/collections/forms-collection";
import { collections as queryFormsResponseCollection } from "~/services/collections/forms-response-collection";

export const Route = createFileRoute("/(app)/dashboard/forms/")({
  component: RouteComponent,
  // ssr: false,
  beforeLoad: async () => {
    await Promise.all([
      queryFormsCollection.preload(),
      queryFormsResponseCollection.preload(),
    ]);
  },
  validateSearch: RouteListsQuerySchema,
});

function RouteComponent() {
  return <FormsLists />;
}
