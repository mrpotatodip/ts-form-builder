import { Hono } from "hono";
import { cors } from "hono/cors";
import { Session, User } from "better-auth";
import { zValidator } from "@hono/zod-validator";

// import { betterAuthMiddleware } from "../auth";
import { DBNeonConnect, Envs, AuthVariables } from "../../";
import {
  FormUpdateSchema,
  FormCreateSchema,
  FormListParamSchema,
  FormDetailParamSchema,
  FormQuerySchema,
} from "../../schemas-types/tbl-form";
import { list, detail } from "./select";
import { create } from "./insert";
import { update } from "./update";

export const createRPC = () => {
  const usersApp = new Hono<{ Bindings: Envs; Variables: AuthVariables }>()
    // .use("/*", betterAuthMiddleware)
    .get(
      "/:party_uuid",
      zValidator("param", FormListParamSchema),
      zValidator("query", FormQuerySchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const query = c.req.valid("query");
          const data = await list(db, param, query);
          return c.json({ data, error: null }, 200);
        } catch (error) {
          return c.json({ data: [], error: "Error" }, 200);
        }
      }
    )
    .get(
      "/:party_uuid/detail/:uuid",
      zValidator("param", FormDetailParamSchema),
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
    )
    .post(
      "/:party_uuid",
      zValidator("param", FormListParamSchema),
      zValidator("json", FormCreateSchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const json = c.req.valid("json");
          const data = await create(db, param, json);
          return c.json({ data, error: null }, 201);
        } catch (error) {
          console.log(error, " error");
          return c.json({ data: [], error: "Error" }, 201);
        }
      }
    )
    .put(
      "/:party_uuid/update/:uuid",
      zValidator("param", FormDetailParamSchema),
      zValidator("json", FormUpdateSchema),
      async (c) => {
        try {
          const db = DBNeonConnect(c.env.DATABASE_URL);
          const param = c.req.valid("param");
          const json = c.req.valid("json");
          const data = await update(db, param, json);
          return c.json({ data, error: null }, 201);
        } catch (error) {
          return c.json({ data: [], error: "Error" }, 201);
        }
      }
    );

  const app = new Hono().route("/forms", usersApp);

  return app;
};

export type RPCRoutes = ReturnType<typeof createRPC>;
