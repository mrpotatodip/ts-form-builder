import { createFileRoute, Outlet } from "@tanstack/react-router";

import { useEnsureQueryData_Detail as useEQD_Detail_forms } from "~/services/hooks/use-forms";

export const Route = createFileRoute("/(app)/dashboard/forms/$form_uuid")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { queryClient, userState } = context;
    const [{ party_uuid }] = userState;
    const { form_uuid: uuid } = params;
    const param = { party_uuid, uuid };
    await Promise.all([useEQD_Detail_forms(queryClient, param)]);
  },
});

function RouteComponent() {
  return <Outlet />;
}
