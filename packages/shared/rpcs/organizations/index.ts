import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { DBNeonConnect, Envs } from "../../";
import {
  OrganizationJsonSchema,
  OrganizationParamSchema,
  OrganizationQuerySchema,
} from "../../schemas-types/tbl-organization";
import { all } from "./select";
import { create } from "./create";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs }>()
    .get(
      "/:author_party_uuid",
      zValidator("param", OrganizationParamSchema),
      zValidator("query", OrganizationQuerySchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const query = c.req.valid("query");
          const data = await all(db, param, query);
          return c.json({ data, error: null }, 200);
        } catch (error) {
          return c.json({ data: null, error: "Error" }, 200);
        }
      }
    )
    .post("/", zValidator("json", OrganizationJsonSchema), async (c) => {
      try {
        const db = DBNeonConnect(c.env.DATABASE_URL);
        const json = c.req.valid("json");
        const data = await create(db, json);
        return c.json({ data, error: null }, 200);
      } catch (error) {
        return c.json({ data: null, error: "Error" }, 200);
      }
    })
    // .post("/", (c) => c.json({ result: "create an author" }, 201))
    .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

  const app = new Hono().route("/organizations", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
