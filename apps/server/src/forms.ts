import { Hono } from "hono";

import { createFormsRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createFormsRPC());

export default app;
