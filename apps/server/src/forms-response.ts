import { Hono } from "hono";

import { createFormsResponseRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createFormsResponseRPC());

export default app;
