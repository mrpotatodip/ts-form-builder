import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { DBNeonConnect, Envs, AuthVariables } from "../../";
import {
  FormResponseCreateSchema,
  FormResponseListParamSchema,
  FormResponseDetailParamSchema,
} from "../../schemas-types/tbl-form-response";
import { createPostFormsResponseMiddleware } from "../middlewares/forms-response-middleware";
import { list, detail } from "./select";
import { create } from "./insert";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>()
    .get(
      "/:form_uuid",
      zValidator("param", FormResponseListParamSchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const data = await list(db, param);
          return c.json({ data, error: null }, 200);
        } catch (error) {
          return c.json({ data: [], error: "Error" }, 200);
        }
      },
    )
    .get(
      "/:form_uuid/detail/:uuid",
      zValidator("param", FormResponseDetailParamSchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const data = await detail(db, param);
          return c.json({ data, error: null }, 200);
        } catch (error) {
          return c.json({ data: [], error: "Error" }, 200);
        }
      },
    )
    .post(
      "/:form_uuid",
      zValidator("param", FormResponseListParamSchema),
      zValidator("json", FormResponseCreateSchema),
      createPostFormsResponseMiddleware,
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const json = c.req.valid("json");
          const data = await create(db, param, json);
          return c.json({ data, error: null }, 201);
        } catch (error) {
          return c.json({ data: [], error: "Failed to create response" }, 500);
        }
      },
    );

  const app = new Hono().route("/forms-response", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
