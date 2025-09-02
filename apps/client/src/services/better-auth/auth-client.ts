import { createAuthClient } from "better-auth/react";
import { redirect } from "@tanstack/react-router";
import { session } from "shared/better-auth/db-schema";

const baseURL = import.meta.env.VITE_BETTER_AUTH_API_URL;
const callbackURL = import.meta.env.VITE_BETTER_AUTH_CALLBACK_URL;

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
  },
});

export const authSignout = async () => {
  await authClient.revokeSessions();
  await authClient.signOut();
};

export const authSigninWithGithub = async () => {
  await authClient.signIn.social(
    { provider: "github", callbackURL },
    {
      onSuccess: (ctx) => {
        redirect({ to: "/dashboard/forms" });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
};

export const authSigninWithGoogle = async () => {
  await authClient.signIn.social(
    { provider: "google", callbackURL },
    {
      onSuccess: (ctx) => {
        redirect({ to: "/dashboard/forms" });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
};

export const authClientSession = async () => {
  // This returns null
  const { data } = await authClient.getSession();
  if (!data) return null;
  return data;
};
