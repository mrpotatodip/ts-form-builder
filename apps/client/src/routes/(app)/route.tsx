import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useEnsureQueryData_All as useEnsureQueryData_All_Users } from "~/services/hooks/use-users";
import { useEnsureQueryData_Detail as useEnsureQueryData_All_PartyUsers } from "~/services/hooks/use-party-users";
import { useEnsureQueryData_All as useEnsureQueryData_All_Organizations } from "~/services/hooks/use-organizations";

export const Route = createFileRoute("/(app)")({
  beforeLoad: async ({ context }) => {
    const { queryClient, ...allOtherContext } = context;
    const { authState } = allOtherContext;

    // NOT AUTH USER
    // if (!authState) return redirect({ to: "/login" });
    // const { userId } = authState!;

    const { data: partyUserState } = await useEnsureQueryData_All_PartyUsers(
      queryClient,
      { userId: "" }
    );

    if (!partyUserState.data) {
      return {
        ...allOtherContext,
      };
    }

    const [{ party_uuid: author_party_uuid }] = partyUserState.data;

    const [usersState, organizationsState] = await Promise.all([
      useEnsureQueryData_All_Organizations(queryClient, { author_party_uuid }),
      useEnsureQueryData_All_Users(queryClient),
    ]);

    return {
      ...allOtherContext,
      partyUserState: partyUserState.data,
      organizationsState: organizationsState.data,
      usersState: usersState.data,
      authState,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
