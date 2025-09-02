import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import { LoginSocialForm } from "~/components/login-social-form";
import { ThemeSwitcher } from "~/services/providers/theme-provider";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="grid gap-6">
        <LoginSocialForm />
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <h1>
          <span className="text-xl tracking-tight">
            <i className="font-semibold tracking-normal underline-offset-4">
              Betterform
            </i>
            .
          </span>
        </h1>
        <p className="text-xs tracking-wider">0.0.1</p>
        <br />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
