import { createFileRoute, Outlet } from "@tanstack/react-router";

import { useEnsureQueryData_Public as useEQD_Public_forms } from "~/services/hooks/use-forms-public";

export const Route = createFileRoute("/(public)/$form_uuid")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    const { form_uuid: uuid } = params;
    const param = { uuid };
    await Promise.all([useEQD_Public_forms(queryClient, param)]);
  },
});

function RouteComponent() {
  return <Outlet />;
}
