/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

import { PosthogProvider } from "~/services/providers/posthog-provider";
import {
  ThemeProvider,
  themeStorageKey,
} from "~/services/providers/theme-provider";
import { SSRPageLoader } from "~/components/custom-ui/ssr-page-loader/ssr-page";
import { fetchQuery_Details } from "~/services/hooks/use-ba-users";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    // const { queryClient } = context;
    // const authState = await fetchQuery_Details(queryClient);

    return {
      authState: [],
      userState: [],
      organizationsState: [],
      forms: [],
      collectionX: null,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <PosthogProvider>
        <ThemeProvider defaultTheme="dark" storageKey={themeStorageKey}>
          <SSRPageLoader
            options={{
              includeStyles: true,
              includeImages: false, // Disable images for faster loading
              includeScripts: false, // Disable scripts for faster loading
              timeout: 5000,
              minimumLoadTime: 300,
            }}
          >
            <Outlet />
            <Toaster position="top-center" />
          </SSRPageLoader>
        </ThemeProvider>
      </PosthogProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />

        <style>{`
          /* Prevent flash of unstyled content */
          body {
            margin: 0;
            // font-family: system-ui, -apple-system, sans-serif;
            // background: #fff;
          }

          /* Ensure content is hidden during loading */
          .app-content {
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          /* Loading state styles */
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            // background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
        `}</style>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('betterform-theme') === 'dark' || (!('betterform-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
        <Scripts />
      </body>
    </html>
  );
}
