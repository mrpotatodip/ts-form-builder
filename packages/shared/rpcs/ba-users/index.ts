import { Hono } from "hono";

import { DBNeonConnect, Envs } from "../..";
import { all } from "./select";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs }>()
    .get("/", async (c) => {
      try {
        const db = DBNeonConnect(c.env.DATABASE_URL);
        const data = await all(db);
        return c.json({ data, error: null }, 200);
      } catch (error) {
        return c.json({ data: null, error: "Error" }, 200);
      }
    })
    .post("/", (c) => c.json({ result: "create an author" }, 201))
    .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

  const app = new Hono().route("/ba-users", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
