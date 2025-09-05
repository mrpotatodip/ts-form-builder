import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { DBNeonConnect, Envs, AuthVariables } from "../../";
import { FormPublicParamSchema } from "../../schemas-types/tbl-form-public";
import { detail } from "./select";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>().get(
    "/:uuid",
    zValidator("param", FormPublicParamSchema),
    async (c) => {
      try {
        const db = DBNeonConnect(c.env.DATABASE_URL);
        const param = c.req.valid("param");
        const data = await detail(db, param);
        return c.json({ data, error: null }, 200);
      } catch (error) {
        return c.json({ data: [], error: "Error" }, 200);
      }
    }
  );

  const app = new Hono().route("/forms-public", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
