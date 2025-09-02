import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context }) => {
    const { queryClient, ...allOtherContext } = context;
    const { authState } = allOtherContext;

    if (authState) return redirect({ to: "/dashboard/forms" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md">
            {/* <img src="/hodle.svg" alt="Logo" className="size-8 text-white" /> */}
            {/* <LogoSVG /> */}
          </div>
          <span className="text-sm font-semibold uppercase tracking-widest">
            Betterform
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
