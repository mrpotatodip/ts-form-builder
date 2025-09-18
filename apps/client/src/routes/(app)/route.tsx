import {
  createFileRoute,
  Outlet,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";

import { AppSidebarDashboard } from "@/components/app-sidebar-dashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useEnsureQueryData_Detail as useEQD_Detail_Users } from "~/services/hooks/use-users";
import { fetchQuery_Details } from "~/services/hooks/use-ba-users";

export const Route = createFileRoute("/(app)")({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;
    const authState = await fetchQuery_Details(queryClient);

    // NOT AUTH USER
    if (!authState) return redirect({ to: "/login" });
    const { userId } = authState.session;

    const { data: userState } = await useEQD_Detail_Users(queryClient, {
      userId,
    });

    if (!userState.data) {
      return {};
    }

    return {
      authState: authState,
      userState: userState.data,
    };

    // return {
    //   authState: authState,
    //   userState: [],
    //   organizationsState: [],
    //   forms: [],
    //   collectionX: null,
    // };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebarDashboard />

      <Outlet />
    </SidebarProvider>
  );
}
