import { createAuthClient } from "better-auth/client";
import { redirect } from "@tanstack/react-router";

const baseURL = import.meta.env.VITE_BETTER_AUTH_API_URL;
const callbackURL = import.meta.env.VITE_BETTER_AUTH_CALLBACK_URL;

export const authClient = createAuthClient({ baseURL });

export const authSignout = async () => {
  await authClient.revokeSessions();
  await authClient.signOut();
};

export const authSigninWithGithub = async () => {
  await authClient.signIn.social(
    { provider: "github", callbackURL },
    {
      onSuccess: (ctx) => {
        redirect({ to: "/dashboard" });
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
        redirect({ to: "/dashboard" });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
};

export const authSession = async () => {
  const { data } = await authClient.getSession();
  if (!data) return null;
  return data;
};
