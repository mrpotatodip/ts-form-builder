import { createFileRoute } from "@tanstack/react-router";

import { useEnsureQueryData_All as useEQD_All_forms } from "~/services/hooks/use-forms";
import { Index as FormsLists } from "~/components/app/dashboard/forms/lists";
import {
  RouteListsQuerySchema,
  validateRouteListsQuery,
} from "~/components/app/dashboard/forms/route-navs-options";

export const Route = createFileRoute("/(app)/dashboard/forms/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient, userState } = context;
    const [{ party_uuid }] = userState;
    await Promise.all([useEQD_All_forms(queryClient, { party_uuid })]);
  },
  validateSearch: RouteListsQuerySchema,
});

function RouteComponent() {
  return <FormsLists />;
}
