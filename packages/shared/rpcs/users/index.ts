import { Hono } from "hono";
import { cors } from "hono/cors";
import { Session, User } from "better-auth";
import { zValidator } from "@hono/zod-validator";

// import { betterAuthMiddleware } from "../auth";
import { DBNeonConnect, Envs, AuthVariables } from "../../";
import { UserParamSchema, UserQuerySchema } from "../../schemas-types/tbl-user";
import { all } from "./select";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>()
    // .use("/*", betterAuthMiddleware)
    .get(
      "/:userId",
      zValidator("param", UserParamSchema),
      zValidator("query", UserQuerySchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const query = c.req.valid("query");
          const data = await all(db, param, query);
          return c.json({ data, error: null }, 200);
        } catch (error) {
          console.log(error, " ERRIR");
          return c.json({ data: null, error: "Error" }, 200);
        }
      }
    )
    // .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }))
    .post("/", (c) => c.json({ result: "create an author" }, 201));

  const app = new Hono().route("/users", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
