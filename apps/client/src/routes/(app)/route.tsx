import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useEnsureQueryData_Detail as useEQD_All_Users } from "~/services/hooks/use-users";
import { useEnsureQueryData_All as useEQD_All_Organizations } from "~/services/hooks/use-organizations";

export const Route = createFileRoute("/(app)")({
  beforeLoad: async ({ context }) => {
    const { queryClient, ...allOtherContext } = context;
    const { authState } = allOtherContext;

    // NOT AUTH USER
    if (!authState) return redirect({ to: "/login" });
    const { userId } = authState!;

    const { data: userState } = await useEQD_All_Users(queryClient, { userId });

    // if (!partyUserState.data) {
    //   return {
    //     ...allOtherContext,
    //   };
    // }

    // const [{ party_uuid: author_party_uuid }] = partyUserState.data;

    // const [organizationsState] = await Promise.all([
    //   useEnsureQueryData_All_Organizations(queryClient, { author_party_uuid }),
    // ]);

    // return {
    //   ...allOtherContext,
    //   partyUserState: partyUserState.data,
    //   organizationsState: organizationsState.data,
    //   authState,
    // };
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
