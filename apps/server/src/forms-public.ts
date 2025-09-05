import { Hono } from "hono";

import { createFormsPublicRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createFormsPublicRPC());

export default app;
