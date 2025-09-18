import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { DBNeonConnect, Envs, AuthVariables } from "../../";

import {
  FormResponsePublicParamSchema,
  FormResponsePublicCreateSchema,
} from "../../schemas-types/tbl-form-response-public";
import { createPostFormsResponseMiddleware } from "../middlewares/forms-response-middleware";
import { create } from "./insert";

export const createRPC = () => {
  const usersApp = new Hono<{
    Bindings: Envs;
    Variables: AuthVariables;
  }>().post(
    "/:form_uuid",
    zValidator("param", FormResponsePublicParamSchema),
    zValidator("json", FormResponsePublicCreateSchema),
    createPostFormsResponseMiddleware,
    async (c) => {
      try {
        const db = DBNeonConnect(c.env.DATABASE_URL);
        const json = c.req.valid("json");
        const data = await create(db, json);
        return c.json({ data, error: null }, 200);
      } catch (error) {
        return c.json({ data: [], error: "Error" }, 200);
      }
    },
  );

  const app = new Hono().route("/public", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
