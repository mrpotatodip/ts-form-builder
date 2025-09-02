import { createFileRoute, redirect } from "@tanstack/react-router";

import { authSignout } from "~/services/better-auth/auth-client";

export const Route = createFileRoute("/(auth)/logout/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    await authSignout();
    return redirect({
      to: "/login",
    });
  },
});

function RouteComponent() {
  return <>logging out ...</>;
}
