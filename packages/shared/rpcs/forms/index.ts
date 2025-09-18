import { Hono } from "hono";
import { cors } from "hono/cors";
import { Session, User } from "better-auth";
import { zValidator } from "@hono/zod-validator";

import { DBNeonConnect, Envs, AuthVariables } from "../../";

import {
  FormUpdateSchema,
  FormCreateSchema,
  FormListParamSchema,
  FormDetailParamSchema,
  FormQuerySchema,
} from "../../schemas-types/tbl-form";
import { createPartyMiddleware } from "../middlewares/party-middleware";
import { list } from "./select";
import { create } from "./insert";
import { update } from "./update";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>()
    .get("/", createPartyMiddleware, async (c) => {
      try {
        const db = DBNeonConnect(c.env.DATABASE_URL);
        const party_uuid = c.get("party_uuid");
        // const party_uuid = "179f4097-2fac-4de2-ba0c-4132fbb6896a";
        const data = await list(db, party_uuid);
        return c.json({ data, error: null }, 200);
      } catch (error) {
        return c.json({ data: [], error: "Error" }, 200);
      }
    })
    .post(
      "/",
      zValidator("json", FormCreateSchema),
      createPartyMiddleware,
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const party_uuid = c.get("party_uuid");
          // const party_uuid = "179f4097-2fac-4de2-ba0c-4132fbb6896a";
          const json = c.req.valid("json");
          const data = await create(db, party_uuid, json);
          return c.json({ data, error: null }, 201);
        } catch (error) {
          return c.json({ data: [], error: "Error" }, 201);
        }
      },
    )
    .put(
      "/:uuid",
      zValidator("param", FormDetailParamSchema),
      zValidator("json", FormUpdateSchema),
      createPartyMiddleware,
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const party_uuid = c.get("party_uuid");
          // const party_uuid = "179f4097-2fac-4de2-ba0c-4132fbb6896a";
          const param = c.req.valid("param");
          const json = c.req.valid("json");
          const data = await update(db, party_uuid, param, json);
          return c.json({ data, error: null }, 201);
        } catch (error) {
          return c.json({ data: [], error: "Error" }, 201);
        }
      },
    );

  const app = new Hono().route("/forms", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
