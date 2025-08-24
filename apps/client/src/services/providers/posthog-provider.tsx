import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type PostHogProviderProps = {
  children: React.ReactNode;
};

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

// posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST, defaults: "2025-05-24" });

export const PosthogProvider = ({ children }: PostHogProviderProps) => {
  // return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  return <>{children}</>;
};
