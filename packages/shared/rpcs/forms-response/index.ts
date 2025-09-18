import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { DBNeonConnect, Envs, AuthVariables } from "../../";
import { createPartyMiddleware } from "../middlewares/party-middleware";
import { list } from "./select";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>().get(
    "/",
    createPartyMiddleware,
    async (c) => {
      try {
        const db = DBNeonConnect(c.env.DATABASE_URL);
        const party_uuid = c.get("party_uuid");
        const data = await list(db, party_uuid);
        return c.json({ data, error: null }, 200);
      } catch (error) {
        return c.json({ data: [], error: "Error" }, 200);
      }
    },
  );

  const app = new Hono().route("/forms-response", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
