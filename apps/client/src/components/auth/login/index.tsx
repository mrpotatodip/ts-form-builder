import { useCallback, useState } from "react";
import {
  IconBrandGithub as GithubIcon,
  IconBrandGoogleFilled as GoogleIcon,
} from "@tabler/icons-react";

import {
  authSigninWithGithub,
  authSigninWithGoogle,
} from "~/services/better-auth/auth-client";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const [isLoadingSocial, isLoadingSocialSet] = useState<
    "github" | "google" | null
  >(null);
  const isLoadingGithub = isLoadingSocial === "github";
  const isLoadingGoogle = isLoadingSocial === "google";

  const handleGithubSignin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      isLoadingSocialSet("github");
      await authSigninWithGithub();
    },
    [isLoadingSocialSet]
  );

  const handleGoogleSignin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      isLoadingSocialSet("google");
      await authSigninWithGoogle();
    },
    [isLoadingSocialSet]
  );

  return (
    <div className="flex justify-center gap-8">
      <form onSubmit={handleGithubSignin}>
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-4 size-28 hover:bg-transparent hover:text-primary cursor-pointer"
          disabled={isLoadingGithub}
        >
          <GithubIcon className="size-8" />
          <span className="text-xs uppercase tracking-wider">
            {isLoadingGithub ? "Github..." : "GitHub"}
          </span>
        </Button>
      </form>

      <form onSubmit={handleGoogleSignin}>
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-4 size-28 hover:bg-transparent hover:text-primary cursor-pointer"
          disabled={isLoadingGoogle}
        >
          <GoogleIcon className="size-8" />
          <span className="text-xs uppercase tracking-wider ">
            {isLoadingGoogle ? "Google..." : "Google"}
          </span>
        </Button>
      </form>
    </div>
  );
};
