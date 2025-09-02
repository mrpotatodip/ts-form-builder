// shared/rpc/auth.ts
import { Hono } from "hono";
import { Session, User } from "better-auth";

import { authInit } from "../../lib/auth-init";
import { Envs, AuthVariables } from "../../schemas-types";
import { createCorsMiddleware } from "../middlewares/cors-middleware";
import { createAuthMiddleware } from "../middlewares/auth-middleware";

export const createRPC = () => {
  const authApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>()
    .use("/*", createCorsMiddleware())
    .use("/*", createAuthMiddleware())
    .on(["POST", "GET"], "/auth/v1/api/*", async (c) => {
      return await authInit(c.env).handler(c.req.raw);
    })
    .get("/auth/v1/session", async (c) => {
      try {
        const session = c.get("session") as Session;
        const user = c.get("user") as User | null;

        if (!user) {
          throw new Error("error: session is null");
        }
        return c.json({ data: { session, user }, error: null });
      } catch (error) {
        return c.json({ data: null, error: JSON.stringify(error) });
      }
    });

  // .get("/auth/v1/me", async (c) => {
  //   const user = c.get("user") as User | null;
  //   const session = c.get("session") as Session | null;

  //   if (!user || !session) {
  //     return c.json({ data: null, error: "Not authenticated" }, 401);
  //   }

  //   return c.json({
  //     data: {
  //       user,
  //       session: {
  //         id: session.id,
  //         expiresAt: session.expiresAt,
  //       },
  //     },
  //     error: null,
  //   });
  // });

  const app = new Hono().route("/", authApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
