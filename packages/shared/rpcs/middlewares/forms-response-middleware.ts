import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { eq, sql } from "drizzle-orm";

import { DBNeonConnect } from "../../";
import { tbl_form } from "../../db-tables/tbl-form";
import { tbl_form_response } from "../../db-tables/tbl-form-response";

type ValidationResult = {
  data: any[];
  error: string;
};

const validateForm = async (form_uuid: string | undefined, c: Context) => {
  try {
    const db = DBNeonConnect(c.env.DATABASE_URL);

    // Etc ...
    if (!form_uuid || form_uuid === "") return { error: "Form not valid" };

    const form = await db
      .select()
      .from(tbl_form)
      .where(eq(tbl_form.uuid, form_uuid));

    if (!form.length) return { error: "Form not found" };
    const [{ limit, status }] = form;

    // Status
    if (status !== "published") return { error: "Form not published" };

    const form_reponse = await db
      .select({ count: sql<number>`count(*)` })
      .from(tbl_form_response)
      .where(eq(tbl_form_response.form_uuid, form_uuid));

    // Limit
    if (limit <= form_reponse[0].count) return { error: "Form limit reached" };

    return { error: null };
  } catch (error) {
    throw { error: "Internal Server Error" };
  }
};

export const createPostFormsResponseMiddleware = createMiddleware(
  async (c, next) => {
    try {
      const { form_uuid } = await c.req.json();
      const validate = await validateForm(form_uuid, c);
      if (validate.error)
        return c.json({ data: [], error: validate.error }, 403);

      await next();
    } catch (error) {
      return c.json({ data: [], error: "Internal Server Error" }, 500);
    }
  },
);

export const createGetFormsResponseMiddleware = createMiddleware(
  async (c, next) => {
    try {
      const form_uuid = c.req.param("uuid");
      const validate = await validateForm(form_uuid, c);
      if (validate.error)
        return c.json({ data: [], error: validate.error }, 403);

      await next();
    } catch (error) {
      return c.json({ data: [], error: "Internal Server Error" }, 500);
    }
  },
);
